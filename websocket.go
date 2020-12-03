package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
)

type WebsocketMessage struct {
	Action  string
	Payload string
}

func (msg *WebsocketMessage) Encode() ([]byte, error) {
	buf := new(bytes.Buffer)
	err := json.NewEncoder(buf).Encode(msg)
	if err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

func (msg *WebsocketMessage) Decode(encoded []byte) error {
	decoder := json.NewDecoder(bytes.NewReader(encoded))
	err := decoder.Decode(msg)
	if err != nil {
		return err
	}
}

func upgradeSocket(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade error:", err)
		return
	}
	defer c.Close()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
			break
		}
		log.Printf("receive error: %s", message)
		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("write error:", err)
			break
		}
	}
}
