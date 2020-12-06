package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
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
	users               *Users
	executableDirectory string
	sessionCookieName   = "session"
)

func handleRoot(w http.ResponseWriter, r *http.Request) {
	user := getOrCreateUserSession(w, r)
	data := struct {
		Message string
		UserID  string
	}{
		"Hello, world!",
		user.String(),
	}
	err := templates.base.Execute(w, data)
	if err != nil {
		log.Println("Request error: ", err)
	}
}
func main() {
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

	chat = new(Chat)
	chat.Init()

	users = new(Users)
	users.Init()

	session.Initialize(time.Minute)

	router := chi.NewRouter()

	router.Use(middleware.SetHeader("Content-Security-Policy", "default-src 'none'; script-src 'self'; font-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';"))
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

	log.Fatal(srv.ListenAndServe())
}
