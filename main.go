package main

import (
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"

	"github.com/fabian-z/dh-webengineering-chat/session"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/gorilla/websocket"
)

var (
	// Globals must be either:
	// already concurrency safe, protected with locks or not be changed after init
	templates *Templates
	upgrader  = websocket.Upgrader{
		HandshakeTimeout: 10 * time.Second,
		// otherwise, use default options
	}
	chat                *Chat
	executableDirectory string
	sessionCookieName   = "session"
	messagesFileName    = "messages.gob" // appended to executableDirectory
	sessionsFileName    = "sessions.gob"
	maxMessageHistory   = 1000
)

func handleRoot(w http.ResponseWriter, r *http.Request) {
	// intial session creation
	getOrCreateUserSession(w, r)
	err := templates.base.Execute(w, nil)
	if err != nil {
		log.Println("Request error: ", err)
	}
}

func main() {

	// Setup globals

	var err error
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	executablePath, err := os.Executable()
	if err != nil {
		log.Fatal("error getting executable path: ", err)
	}
	executableDirectory = filepath.Dir(executablePath)

	templates = new(Templates)
	err = templates.init(filepath.Join(executableDirectory, "templates"))
	if err != nil {
		log.Fatal(err)
	}

	// Setup router and HTTP server

	router := chi.NewRouter()

	// Set security headers
	router.Use(middleware.SetHeader("Content-Security-Policy", "default-src 'none'; script-src 'self'; font-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';"))
	router.Use(middleware.SetHeader("X-Frame-Options", "deny"))
	router.Use(middleware.SetHeader("X-XSS-Protection", "1; mode=block"))
	router.Use(middleware.SetHeader("X-Content-Type-Options", "nosniff"))
	// Feature policy would be nice, but very long https://github.com/w3c/webappsec-permissions-policy/issues/189

	router.Use(middleware.RequestID)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)

	router.Get("/ws", handleSocket)

	var staticPath = filepath.Join(executableDirectory, "static")
	router.Get("/css/*", http.FileServer(http.Dir(staticPath)).ServeHTTP)
	router.Get("/js/*", http.FileServer(http.Dir(staticPath)).ServeHTTP)
	router.Get("/gfx/*", http.FileServer(http.Dir(staticPath)).ServeHTTP)
	router.Get("/fonts/*", http.FileServer(http.Dir(staticPath)).ServeHTTP)

	router.Get("/", handleRoot)

	// Manually specify timeout values
	// https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/
	srv := &http.Server{
		ReadTimeout:       1 * time.Second,
		WriteTimeout:      1 * time.Second,
		IdleTimeout:       30 * time.Second,
		ReadHeaderTimeout: 2 * time.Second,
		Handler:           router,
		Addr:              ":8080",
	}

	// Read message files if persisted

	var messages Messages = make(Messages, 0, maxMessageHistory+1)
	err = messages.DeserializeFromFile(filepath.Join(executableDirectory, messagesFileName))
	if err != nil {
		if os.IsNotExist(errors.Unwrap(err)) {
			log.Println("No messages file found")
		} else {
			log.Fatalf("Error loading messages file: %v", err)
		}
	}

	// Initialize main chat routine

	chat = new(Chat)
	chat.Init(messages)

	session.Initialize(time.Minute)

	// read session files if persisted

	storedSessPath := filepath.Join(executableDirectory, sessionsFileName)
	if _, err := os.Stat(storedSessPath); os.IsNotExist(err) {
		log.Println("No sessions file found")
	} else {
		storedSess, err := ioutil.ReadFile(storedSessPath)
		if err != nil {
			log.Fatal("Could not read stored sessions:", err)
		}
		err = session.Deserialize(storedSess)
		if err != nil {
			log.Fatal("Error loading stored sessions:", err)
		}
	}

	// signal handling for graceful shutdown

	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, os.Interrupt, syscall.SIGTERM)
	signal.Ignore(syscall.SIGHUP) // do not exit if controlling terminal closes

	go func() {
		<-signalChan
		log.Println("Graceful shutdown requested")

		chatShutdownDone := make(chan struct{})
		chat.shutdown <- chatShutdownDone
		<-chatShutdownDone

		sessionBytes, err := session.Serialize()
		if err != nil {
			log.Println("error serializing sessions:", err)
		} else {
			err = ioutil.WriteFile(storedSessPath, sessionBytes, 0600)
			if err != nil {
				log.Println("error writing session serialization:", err)
				os.Remove(storedSessPath)
			}
		}

		os.Exit(0)
	}()

	// Start listening for client requests

	log.Fatal(srv.ListenAndServe())
}
