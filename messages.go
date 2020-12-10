package main

import (
	"encoding/gob"
	"fmt"
	"log"
	"os"

	"github.com/google/uuid"
)

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

type Messages []Message

func (m *Messages) SerializeToFile(path string) error {
	log.Println("Serializing: ", m)
	dst, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("error creating file: %w", err)
	}
	err = gob.NewEncoder(dst).Encode(m)
	if err != nil {
		return fmt.Errorf("error serializing messages: %w", err)
	}
	return dst.Close()
}

func (m *Messages) DeserializeFromFile(path string) error {
	src, err := os.Open(path)
	if err != nil {
		return fmt.Errorf("error opening file: %w", err)
	}
	defer src.Close()
	err = gob.NewDecoder(src).Decode(m)
	if err != nil {
		return fmt.Errorf("error deserializing messages: %w", err)
	}
	return nil
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
