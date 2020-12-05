package main

import (
	"log"
	"net/http"

	"github.com/google/uuid"
)

var (
	actionClientInit = "init"
)

type InitMessage struct {
	Action         string `json:"action"`
	User           User   `json:"user"`
	ConnectedUsers []User `json:"connected"`

	//Messages []string
}

type User struct {
	UserID   string `json:"userid"`
	UserName string `json:"username"`
}

func upgradeSocket(w http.ResponseWriter, r *http.Request) {

	sess := getOrCreateUserSession(w, r)

	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade error:", err)
		return
	}
	defer c.Close()

	err = c.WriteJSON(InitMessage{
		Action: actionClientInit,
		User: User{
			UserID:   sess.UUID.String(), // do not expose session ID, use separate UUID
			UserName: sess.User,
		},
		ConnectedUsers: []User{{
			UserID:   uuid.New().String(),
			UserName: "testuser1"},
		}})

	if err != nil {
		log.Println("error writing init message")
	}

	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
			break
		}
		log.Printf("received : %s", message)
		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("write error:", err)
			break
		}
	}
}
