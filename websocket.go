package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

func upgradeSocket(w http.ResponseWriter, r *http.Request) {
	userID := getOrCreateUserSession(w, r)

	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade error:", err)
		return
	}

	user, err := users.GetUser(userID)
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

		log.Printf("received : %s", message)

		user, err := users.GetUser(userID)
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
			newUser := User{UserID: userID.String(), UserName: clientMessage.UserName}
			users.SetUser(userID, newUser)
			chat.send <- Message{
				Action:   "usernameChange",
				UserFrom: newUser,
			}
		}

	}
}
