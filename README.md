Project work for lecture Web Engineering @ DHBW Lörrach

# Task

* Implementation of a client/server chat application
* Must be implemented as a web application
* Backend technology and language can be freely chosen
  * This project will use Go for the backend
* The task is to implement a simple chat application, which allows multiple clients to connect to a shared backend which forwards messages from all clients
* Used technologies for transmission, storage and presentation must be documented and decisions explained

## Client

* The client should have at least two areas - a message area and an input area where messages can be sent to all connected clients ☑
* Each client should be uniquely identified (with a name) ☑
  * This project uses random UUIDs for public client identification

## Backend

* The backend should manage connected clients and forward received messages to other clients ☑
* The must-have requirements do not include persistence or user management.

## Extra

* List of connected clients ☑
* Forward past public messages to clients on new connection ☑
* Identicons for visual representation of unique client IDs ☑
* Session management ☑
  * Session persistence ☑
* Persistence of chat messages ☑
* Structured bi-directional communicaton using JSON over WebSockets ☑
  * Indicate connection status ☑
* Client name changes ☑
* Responsive layout ☑
  * (Not yet ready for mobile devices)

* Unicast / private chat
  * Prepared in backend ☑

* Allow transmission of formatted content
* More as chosen by group