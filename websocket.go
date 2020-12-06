package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var (
	actionClientInit = "init"
)

type InitMessage struct {
	Action         string  `json:"action"`
	User           *User   `json:"user"`
	ConnectedUsers []*User `json:"connected"`

	//Messages []string
}

type User struct {
	UserID   string `json:"userid"`
	UserName string `json:"username"`
}

type ClientMessage struct {
	Action   string `json:"action"`
	Text     string `json:"text"`
	UserName string `json:"username"`
}

func upgradeSocket(w http.ResponseWriter, r *http.Request) {
	user := getOrCreateUserSession(w, r)

	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade error:", err)
		return
	}

	chat.connect <- UserConnection{
		user: user,
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
				user: user,
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

		switch clientMessage.Action {
		case "broadcast":
			// TODO filter messages, e.g. empty or invalid text
			// broadcast only for now
			chat.send <- Message{
				Action:   "broadcast",
				UserFrom: user,
				UserTo:   nil,
				Text:     clientMessage.Text,
			}
		case "usernameChange":
			// TODO resolve race condition for User
		}

	}
}
