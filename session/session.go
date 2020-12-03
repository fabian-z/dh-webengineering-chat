// Package session implements a very simple in-memory session store with correct eviction
// in presence of wall clock jumps, given time.Time supports monotonic clock readings
// session IDs are randomly generated and base64 URL encoded for use in cookies
package session

import (
	"crypto/rand"
	"encoding/base64"
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

// Session could also be interface{} for a generic package
type Session struct {
	User string
	UUID uuid.UUID
	//...
}

type sessions struct {
	sync.RWMutex
	sessions map[string]Session
	expiry   map[string]time.Time
}

// expiry uses monotonic time readings on supported systems and Go versions
// TODO unit testing of expiry, extension, validity

func Initialize(evictionPeriod time.Duration) {
	if store != nil {
		panic("invalid multiple initialization calls")
	}

	store = new(sessions)
	store.sessions = make(map[string]Session)
	store.expiry = make(map[string]time.Time)

	go func() {
		c := time.Tick(evictionPeriod)
		for range c {
			store.Lock()
			now := time.Now()
			for key, expireTime := range store.expiry {
				if now.After(expireTime) {
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

func DeleteSession(id string) {
	store.Lock()
	defer store.Unlock()

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
