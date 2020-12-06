package main

import (
	"errors"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/fabian-z/dh-webengineering-chat/session"
	"github.com/google/uuid"
)

// User handling
type User struct {
	UserID   string `json:"userid"` //UUID string
	UserName string `json:"username"`
}

type Users struct {
	sync.RWMutex
	List map[uuid.UUID]User
}

func (users *Users) Init() {
	users.List = make(map[uuid.UUID]User)
}

func (users *Users) GetUser(id uuid.UUID) (User, error) {
	users.RLock()
	defer users.RUnlock()
	if user, ok := users.List[id]; ok {
		return user, nil
	} else {
		return User{}, errors.New("User not found")
	}
}
func (users *Users) SetUser(id uuid.UUID, user User) {
	users.Lock()
	defer users.Unlock()
	if id.String() != user.UserID {
		panic("invalid user - id mapping")
	}
	users.List[id] = user
}

func (users *Users) DeleteUser(id uuid.UUID) {
	users.Lock()
	defer users.Unlock()
	delete(users.List, id)
}

// User sessions
func newUserSession() (string, session.Session) {
	userID := uuid.New()

	u := User{
		UserName: "Anonymous",
		UserID:   userID.String(),
	}

	users.SetUser(userID, u)

	id, err := session.AddSession(userID, 24*time.Hour)
	if err != nil {
		// Error reading randomness, should not happen without OS errors
		panic(err)
	}
	return id, userID
}

func addSessionCookie(sessionID string, w http.ResponseWriter) {
	cookie := http.Cookie{
		Name:     sessionCookieName,
		Value:    sessionID,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
		// Use session cookies
		Expires: time.Now().Add(24 * time.Hour),
	}
	http.SetCookie(w, &cookie)
}

func getOrCreateUserSession(w http.ResponseWriter, r *http.Request) uuid.UUID {
	var sessionID string
	var curSession session.Session
	// check if a session exists for this client, if not add one and send ID with cookie
	sessionCookie, err := r.Cookie(sessionCookieName)
	if err == http.ErrNoCookie {
		// no cookie sent, add new session
		sessionID, curSession = newUserSession()
		addSessionCookie(sessionID, w)
	} else {
		curSession, err = session.GetSession(sessionCookie.Value)
		if err != nil {
			// expired or invalid cookie sent, add new session
			sessionID, curSession = newUserSession()
			addSessionCookie(sessionID, w)
		}
		err = session.ExtendSession(sessionCookie.Value, 24*time.Hour)
		if err != nil {
			log.Println("Error extending session: ", err)
		}
	}

	return curSession.(uuid.UUID)
}
