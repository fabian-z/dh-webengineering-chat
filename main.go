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
	executableDirectory string
	sessionCookieName   = "session"
)

func handleRoot(w http.ResponseWriter, r *http.Request) {
	curSession := getOrCreateUserSession(w, r)
	data := struct {
		Message  string
		Username string
	}{
		"Hello, world!",
		curSession.User,
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

	session.Initialize(time.Minute)

	router := chi.NewRouter()

	router.Use(middleware.RequestID)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)

	router.Get("/ws", upgradeSocket)

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
