package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/fabian-z/dh-webengineering-chat/session"
	"github.com/gorilla/websocket"
)

func handleSocket(w http.ResponseWriter, r *http.Request) {
	userID := getOrCreateUserSession(w, r)

	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade error:", err)
		return
	}

	user, err := session.GetSessionByUUID(userID)
	if err != nil {
		log.Println("get client error:", err)
		return
	}

	chat.connect <- UserConnection{
		user: userID,
		conn: c,
	}

	err = c.WriteJSON(InitMessage{
		Action:         actionClientInit,
		User:           user,
		ConnectedUsers: chat.GetUsers(),
	})

	if err != nil {
		log.Println("error writing init message")
		return
	}

	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
			chat.disconnect <- UserConnection{
				user: userID,
				conn: c,
			}
			break
		}
		if mt != websocket.TextMessage {
			log.Println("received binary message from ", user.UserID)
			continue
		}

		var clientMessage ClientMessage
		err = json.NewDecoder(bytes.NewReader(message)).Decode(&clientMessage)
		if err != nil {
			log.Println("received invalid message from ", user.UserID)
			continue
		}

		user, err := session.GetSessionByUUID(userID)
		if err != nil {
			// TODO evaluate error cases here
			panic("invalid user")
		}

		switch clientMessage.Action {
		case "broadcast":
			// TODO filter messages, e.g. empty or invalid text
			// broadcast only for now
			chat.send <- Message{
				Action:   "broadcast",
				UserFrom: user,
				Text:     clientMessage.Text,
			}
		case "usernameChange":
			if user.UserName == clientMessage.UserName || len(clientMessage.UserName) > 50 {
				log.Println("invalid username change from ", user.UserID)
				continue
			}
			newUser := session.Session{UserID: userID, UserName: clientMessage.UserName}
			err := session.UpdateSessionByUUID(userID, newUser)
			if err != nil {
				log.Println("received username change from ", user.UserID)
				continue
			}
			chat.send <- Message{
				Action:   "usernameChange",
				UserFrom: newUser,
			}
		}

	}
}
