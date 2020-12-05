package main

import (
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
		}
		log.Printf("received : %s", message)
		// broadcast only for now
		chat.send <- Message{
			UserFrom: user,
			UserTo:   nil,
			Text:     string(message),
		}

	}
}
