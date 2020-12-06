package main

import "github.com/google/uuid"

var (
	actionClientInit = "init"
)

// Server -> Client
type Message struct {
	Action   string    `json:"action"` // newUser, removeUser, broadcast, unicast, usernameChange
	UserFrom User      `json:"sender,omitempty"`
	UserTo   uuid.UUID `json:"-"`
	Text     string    `json:"text,omitempty"`
}

// Initial Server -> Client
type InitMessage struct {
	Action         string `json:"action"` // init
	User           User   `json:"user"`
	ConnectedUsers []User `json:"connected"`
}

// Client -> Server
type ClientMessage struct {
	Action   string `json:"action"` // broadcast, unicast, usernameChange
	Text     string `json:"text"`
	UserName string `json:"username"`
}
