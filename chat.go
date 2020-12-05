package main

import (
	"log"

	"github.com/gorilla/websocket"
)

type UserConnection struct {
	user *User
	conn *websocket.Conn
}

type Message struct {
	UserFrom *User  `json:"sender"`
	UserTo   *User  `json:"-"` // nil for broadcast
	Text     string `json:"text"`
}

type Chat struct {
	connectedClients map[*User]*websocket.Conn

	send       chan Message
	userList   chan chan []*User
	connect    chan UserConnection
	disconnect chan UserConnection
}

func (chat *Chat) Init() {
	chat.connectedClients = make(map[*User]*websocket.Conn)

	chat.send = make(chan Message, 1)
	chat.userList = make(chan chan []*User)
	chat.connect = make(chan UserConnection)
	chat.disconnect = make(chan UserConnection)

	go func() {
		for {
			select {
			case connection := <-chat.connect:
				log.Printf("adding user %s", connection.user.UserID)
				chat.connectedClients[connection.user] = connection.conn
			case connection := <-chat.disconnect:
				// currently only handles disconnection by user
				log.Printf("removing user %s", connection.user.UserID)
				if ws, ok := chat.connectedClients[connection.user]; ok {
					ws.Close()
				}
				delete(chat.connectedClients, connection.user)
			case listChan := <-chat.userList:
				log.Printf("listing users")
				var users []*User
				for u := range chat.connectedClients {
					users = append(users, u)
				}
				listChan <- users
			case message := <-chat.send:
				if message.UserTo == nil {
					log.Println("Broadcasting message")
					// broadcast
					for user, conn := range chat.connectedClients {
						err := conn.WriteJSON(message)
						if err != nil {
							conn.Close()
							delete(chat.connectedClients, user)
						}
					}
				} else {
					// unicast
					log.Println("Unicasting message")
					if conn, ok := chat.connectedClients[message.UserTo]; ok {
						err := conn.WriteJSON(message)
						if err != nil {
							conn.Close()
							delete(chat.connectedClients, message.UserTo)
						}
					}
				}

			}
		}
	}()
}

func (chat *Chat) GetUsers() (users []*User) {
	listChan := make(chan []*User)
	chat.userList <- listChan
	users = <-listChan
	return
}
