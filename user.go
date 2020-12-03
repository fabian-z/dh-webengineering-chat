package main

import (
	"net/http"
	"time"

	"github.com/fabian-z/dh-webengineering-chat/session"
	"github.com/google/uuid"
)

func newUserSession() (string, session.Session) {
	s := session.Session{
		User: "Anonymous",
		UUID: uuid.New(),
	}
	id, err := session.AddSession(s, time.Hour)
	if err != nil {
		// Error reading randomness, should not happen without OS errors
		panic(err)
	}
	return id, s
}

func addSessionCookie(sessionID string, w http.ResponseWriter) {
	cookie := http.Cookie{
		Name:     sessionCookieName,
		Value:    sessionID,
		Path:     "/",
		HttpOnly: true,
		// Use session cookies
		//Expires: expire,
	}
	http.SetCookie(w, &cookie)
}

func getOrCreateUserSession(w http.ResponseWriter, r *http.Request) session.Session {
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
	}

	return curSession
}
