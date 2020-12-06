import {
    toSvg,
} from "jdenticon";
3

console.log(toSvg("my value", 100));

let ws;
let username = "Anonymous";

function log(message) {
    let m = document.createElement("div");
    let output = document.getElementById("messages");
    m.textContent = message;
    m.className = "message";

    output.appendChild(m);
}

document.addEventListener('DOMContentLoaded', function() {
    ws = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws");

    ws.onopen = function() {
        log("Connected to chatroom");
    };
    ws.onclose = function() {
        log("Disconnected from chatroom");
        ws = null;
    };
    ws.onmessage = function(evt) {
        //log("RESPONSE: " + evt.data);

        let msg = JSON.parse(evt.data);
        switch (msg.action) {
            case "init":
                document.getElementById("username").value = msg.user.username;
                break;
            case "broadcast":
                log(`${msg.sender.username}: ${msg.text}`);
                break;
            case "systemBroadcast":
                log(`${msg.text}`);
                break;
            default:
                console.log("Unhandled message action:", msg);
        }
    };
    ws.onerror = function(evt) {
        log("ERROR: " + evt.data);
    };

}, false);

document.getElementById("submit").addEventListener("click", function() {
    let input = document.getElementById("message-entry");

    if (!ws || input.value.length === 0) {
        return false;
    }

    let msg = {
        //broadcast only for now
        action: "broadcast",
        text: input.value.trim(),
    };

    //log("SEND: " + input.value);
    ws.send(JSON.stringify(msg));
    input.value = "";
    return false;
}, false);

document.getElementById("username").addEventListener("focusout", function() {
    let input = document.getElementById("username");

    if (username !== input.value) {
        username = input.value;
        let usernameChanged = {
            action: "usernameChange",
            username: input.value,
        };
        ws.send(JSON.stringify(usernameChanged));
    }
}, false);