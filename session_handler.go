package main

import (
	"log"
	"net/http"
	"time"

	"github.com/fabian-z/dh-webengineering-chat/session"
	"github.com/google/uuid"
)

// User sessions
func newUserSession() (string, session.Session) {
	userID := uuid.New()

	u := session.Session{
		UserName: "Anonymous",
		UserID:   userID,
	}

	id, err := session.AddSession(u, 24*time.Hour)
	if err != nil {
		// Error reading randomness, should not happen without OS errors
		panic(err)
	}
	return id, u
}

func addSessionCookie(sessionID string, w http.ResponseWriter) {
	cookie := http.Cookie{
		Name:     sessionCookieName,
		Value:    sessionID,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
		Expires:  time.Now().Add(24 * time.Hour),
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
	} else {
		curSession, err = session.GetSession(sessionCookie.Value)
		if err != nil {
			// expired or invalid cookie sent, add new session
			sessionID, curSession = newUserSession()
		} else {
			sessionID = sessionCookie.Value
			// session should be valid for 24 hours after last access
			err = session.ExtendSession(sessionID, 24*time.Hour)
			if err != nil {
				log.Println("Error extending session: ", err)
			}
		}
	}
	addSessionCookie(sessionID, w)
	return curSession.UserID
}
