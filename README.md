Project work for lecture Web Engineering @ DHBW Lörrach

# Task

* Implementation of a client/server chat application
* Must be implemented as a web application
* Backend technology and language can be freely chosen
  * This project will use Go for the backend
* The task is to implement a simple chat application, which allows multiple clients to connect to a shared backend which forwards messages from all clients
* Used technologies for transmission, storage and presentation must be documented and decisions explained

## Client

* The client should have at least two areas - a message area and an input area where messages can be sent to all connected clients
* Each client should be uniquely identified (with a name)

## Backend

* The backend should manage connected clients and forward received messages to other clients
* The must-have requirements do not include persistence or user management.

## Extra

* List of connected clients
* Persistence of chat messages
* Forward past messages to client on new connection
* Allow transmission of formatted content
* More as chosen by group