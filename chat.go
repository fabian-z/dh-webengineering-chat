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

type Chat struct {
	connectedClients  map[uuid.UUID]*websocket.Conn
	messages          []Message // TODO persist
	maxMessageHistory int

	send       chan Message
	userList   chan chan []uuid.UUID
	connect    chan UserConnection
	disconnect chan UserConnection
}

func (chat *Chat) Init() {
	chat.connectedClients = make(map[uuid.UUID]*websocket.Conn)

	chat.maxMessageHistory = 1000
	chat.messages = make([]Message, chat.maxMessageHistory+1)

	chat.send = make(chan Message, 10)
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

				user, err := users.GetUser(connection.user)
				if err != nil {
					panic("Invalid user added in chat clients")
				}

				message := Message{
					Action:   "newUser",
					UserFrom: user,
				}
				for user, conn := range chat.connectedClients {
					if user == connection.user {
						continue
					}
					err := conn.WriteJSON(message)
					if err != nil {
						conn.Close()
						delete(chat.connectedClients, user)
					}
				}

				// send past messages to new user
				for _, msg := range chat.messages {
					err := connection.conn.WriteJSON(msg)
					if err != nil {
						connection.conn.Close()
						delete(chat.connectedClients, connection.user)
						break
					}
				}

			case connection := <-chat.disconnect:
				// disconnect specified user
				log.Printf("removing user %s", connection.user.String())
				if ws, ok := chat.connectedClients[connection.user]; ok {
					ws.Close()
				}
				delete(chat.connectedClients, connection.user)

				user, err := users.GetUser(connection.user)
				if err != nil {
					panic("Invalid user added in chat clients")
				}

				message := Message{
					Action:   "removeUser",
					UserFrom: user,
				}
				for user, conn := range chat.connectedClients {
					if user == connection.user {
						continue
					}
					err := conn.WriteJSON(message)
					if err != nil {
						conn.Close()
						delete(chat.connectedClients, user)
					}
				}

			case listChan := <-chat.userList:
				log.Printf("listing users")
				var users []uuid.UUID
				for u := range chat.connectedClients {
					users = append(users, u)
				}
				listChan <- users

			case message := <-chat.send:

				switch message.Action {
				case "broadcast", "usernameChange":
					log.Println("Broadcasting message")

					// save public message history
					chat.messages = append(chat.messages, message)
					if len(chat.messages) > chat.maxMessageHistory {
						chat.messages = chat.messages[1:]
					}

					for user, conn := range chat.connectedClients {
						err := conn.WriteJSON(message)
						if err != nil {
							conn.Close()
							delete(chat.connectedClients, user)
						}
					}
				case "unicast":
					// unicast, not yet implemented in frontend
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
