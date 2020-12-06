package main

import (
	"log"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type UserConnection struct {
	user uuid.UUID
	conn *websocket.Conn
}

type Message struct {
	Action   string    `json:"action"` // broadcast or unicast
	UserFrom User      `json:"sender,omitempty"`
	UserTo   uuid.UUID `json:"-"`
	Text     string    `json:"text"`
}

type UpdateUsersMessage struct {
	Action         string `json:"action"`
	ConnectedUsers []User `json:"connected"`
}

type Chat struct {
	connectedClients map[uuid.UUID]*websocket.Conn

	send       chan Message
	userList   chan chan []uuid.UUID
	connect    chan UserConnection
	disconnect chan UserConnection
}

func (chat *Chat) Init() {
	chat.connectedClients = make(map[uuid.UUID]*websocket.Conn)

	chat.send = make(chan Message, 1)
	chat.userList = make(chan chan []uuid.UUID)
	chat.connect = make(chan UserConnection)
	chat.disconnect = make(chan UserConnection)

	go func() {
		for {
			select {
			case connection := <-chat.connect:
				log.Printf("adding user %s", connection.user.String())

				// Add user to internal list
				chat.connectedClients[connection.user] = connection.conn
				chat.updateUserlist(connection.user)

			case connection := <-chat.disconnect:
				// currently only handles disconnection by user
				log.Printf("removing user %s", connection.user.String())
				if ws, ok := chat.connectedClients[connection.user]; ok {
					ws.Close()
				}
				delete(chat.connectedClients, connection.user)
				chat.updateUserlist(connection.user)

			case listChan := <-chat.userList:
				log.Printf("listing users")
				var users []uuid.UUID
				for u := range chat.connectedClients {
					users = append(users, u)
				}
				listChan <- users

			case message := <-chat.send:

				switch message.Action {
				case "broadcast", "systemBroadcast":
					log.Println("Broadcasting message")
					for user, conn := range chat.connectedClients {
						err := conn.WriteJSON(message)
						if err != nil {
							conn.Close()
							delete(chat.connectedClients, user)
						}
					}
					if message.Action == "systemBroadcast" {
						// Hack, update userlist on systemBroadcast
						chat.updateUserlist([16]byte{})
					}
				case "unicast":
					// unicast
					log.Println("Unicasting message")
					// TODO validate use of mustparse here
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

func (chat *Chat) updateUserlist(changedUser uuid.UUID) {
	// compile list and inform other users about new connection
	var userList []User
	for u := range chat.connectedClients {
		user, err := users.GetUser(u)
		if err != nil {
			panic("Invalid user listed in chat clients")
		}
		userList = append(userList, user)
	}
	updateMsg := UpdateUsersMessage{
		Action:         "updateUserlist",
		ConnectedUsers: userList,
	}
	for user, conn := range chat.connectedClients {
		if user == changedUser {
			continue
		}
		err := conn.WriteJSON(updateMsg)
		if err != nil {
			conn.Close()
			delete(chat.connectedClients, user)
		}
	}
}

func (chat *Chat) GetUsers() []User {
	listChan := make(chan []uuid.UUID)
	chat.userList <- listChan
	userUUIDs := <-listChan

	var userList []User
	for _, v := range userUUIDs {
		u, err := users.GetUser(v)
		if err != nil {
			panic("Invalid user listed in chat clients")
		}
		userList = append(userList, u)
	}

	return userList
}
