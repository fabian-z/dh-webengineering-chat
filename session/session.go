// Package session implements a very simple in-memory session store with correct eviction
// in presence of wall clock jumps, given time.Time supports monotonic clock readings
// session IDs are randomly generated and base64 URL encoded for use in cookies
package session

import (
	"bytes"
	"crypto/rand"
	"encoding/base64"
	"encoding/gob"
	"fmt"
	"io"
	"sync"
	"time"

	"github.com/google/uuid"
)

var (
	store *sessions
)

const (
	sessionIDLength = 64
)

type Session struct {
	UserID   uuid.UUID `json:"userid"` // UUIDs are public
	UserName string    `json:"username"`
}

type sessions struct {
	sync.RWMutex
	userUUID map[uuid.UUID]string // maps UUIDs to user sessions
	sessions map[string]Session   // session IDs are private
	expiry   map[string]time.Time
}

// expiry uses monotonic time readings on supported systems and Go versions
// TODO unit testing of expiry, extension, validity

func Initialize(evictionPeriod time.Duration) {
	if store != nil {
		panic("invalid multiple initialization calls")
	}

	store = new(sessions)
	store.userUUID = make(map[uuid.UUID]string)
	store.sessions = make(map[string]Session)
	store.expiry = make(map[string]time.Time)

	go func() {
		c := time.Tick(evictionPeriod)
		for range c {
			store.Lock()
			now := time.Now()
			for key, expireTime := range store.expiry {
				if now.After(expireTime) {
					session, ok := store.sessions[key]
					if ok {
						delete(store.userUUID, session.UserID)
					}
					delete(store.expiry, key)
					delete(store.sessions, key)
				}
			}
			store.Unlock()
		}
	}()
}

func AddSession(session Session, expiry time.Duration) (string, error) {
	store.Lock()
	defer store.Unlock()

	var idBytes = make([]byte, sessionIDLength)
	_, err := io.ReadFull(rand.Reader, idBytes)
	if err != nil {
		return "", fmt.Errorf("error reading randomness for session identifier: %w", err)
	}

	id := base64.RawURLEncoding.EncodeToString(idBytes)

	store.userUUID[session.UserID] = id
	store.sessions[id] = session
	store.expiry[id] = time.Now().Add(expiry)

	return id, nil
}

func GetSession(id string) (Session, error) {
	store.RLock()
	defer store.RUnlock()

	session, ok := store.sessions[id]
	if !ok {
		return Session{}, fmt.Errorf("session expired or not existing")
	}
	expiry := store.expiry[id]
	if time.Now().After(expiry) {
		return Session{}, fmt.Errorf("session expired")
	}

	return session, nil
}

func GetSessionByUUID(uuid uuid.UUID) (Session, error) {
	store.RLock()
	defer store.RUnlock()

	sessionID, ok := store.userUUID[uuid]
	if !ok {
		return Session{}, fmt.Errorf("user id not found")
	}
	session, ok := store.sessions[sessionID]
	if !ok {
		return Session{}, fmt.Errorf("session expired or not existing")
	}
	expiry := store.expiry[sessionID]
	if time.Now().After(expiry) {
		return Session{}, fmt.Errorf("session expired")
	}

	return session, nil
}

func DeleteSession(id string) {
	store.Lock()
	defer store.Unlock()

	session, ok := store.sessions[id]
	if ok {
		delete(store.userUUID, session.UserID)
	}
	delete(store.sessions, id)
	delete(store.expiry, id)
}

func ExtendSession(id string, expiry time.Duration) error {
	store.Lock()
	defer store.Unlock()

	_, ok := store.expiry[id]
	if !ok {
		return fmt.Errorf("session expired or not existing")
	}

	store.expiry[id] = time.Now().Add(expiry)
	return nil
}

func UpdateSession(id string, session Session) error {
	store.Lock()
	defer store.Unlock()

	_, ok := store.expiry[id]
	if !ok {
		return fmt.Errorf("session expired or not existing")
	}

	store.sessions[id] = session
	return nil
}

func UpdateSessionByUUID(uuid uuid.UUID, session Session) error {
	store.Lock()
	defer store.Unlock()

	sessionID, ok := store.userUUID[uuid]
	if !ok {
		return fmt.Errorf("user id not found")
	}

	_, ok = store.expiry[sessionID]
	if !ok {
		return fmt.Errorf("session expired or not existing")
	}

	store.sessions[sessionID] = session
	return nil
}

func Serialize() ([]byte, error) {
	// note that monotonic time readings are lost on serialization

	// Stored in order:
	//sessions map[string]Session
	//expiry   map[string]time.Time

	// Regenerated on Deserialization:
	//userUUID map[uuid.UUID]string
	store.Lock()
	defer store.Unlock()

	buf := new(bytes.Buffer)
	enc := gob.NewEncoder(buf)
	err := enc.Encode(store.sessions)
	if err != nil {
		return nil, fmt.Errorf("error encoding session store: %w", err)
	}
	err = enc.Encode(store.expiry)
	if err != nil {
		return nil, fmt.Errorf("error encoding session store expiry: %w", err)
	}

	return buf.Bytes(), nil
}

func Deserialize(src []byte) error {
	// replaces stored values completely
	// in order to avoid inconsistencies
	store.Lock()
	defer store.Unlock()

	sessionMap := make(map[string]Session)
	expiryMap := make(map[string]time.Time)
	uuidMap := make(map[uuid.UUID]string)

	dec := gob.NewDecoder(bytes.NewReader(src))
	err := dec.Decode(&sessionMap)
	if err != nil {
		return fmt.Errorf("error reading serialized session store: %w", err)
	}
	err = dec.Decode(&expiryMap)
	if err != nil {
		return fmt.Errorf("error reading serialized session store expiry: %w", err)
	}

	for sessionID, session := range sessionMap {
		uuidMap[session.UserID] = sessionID
	}

	store.sessions = sessionMap
	store.expiry = expiryMap
	store.userUUID = uuidMap

	return nil
}
