package main

import "github.com/google/uuid"

var (
	actionClientInit = "init"
)

type Message struct {
	Action   string    `json:"action"`
	UserFrom User      `json:"sender,omitempty"`
	UserTo   uuid.UUID `json:"-"`
	Text     string    `json:"text,omitempty"`
}

type InitMessage struct {
	Action         string `json:"action"`
	User           User   `json:"user"`
	ConnectedUsers []User `json:"connected"`
}

type ClientMessage struct {
	Action   string `json:"action"`
	Text     string `json:"text"`
	UserName string `json:"username"`
}

type SystemMessage struct {
	Action string `json:"action"`
	Text   string `json:"text"`
}
