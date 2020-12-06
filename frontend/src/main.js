import {
    toSvg,
} from "jdenticon";

let ws;
let username = "Anonymous";

function log(message) {
    let m = document.createElement("div");
    let output = document.getElementById("messages");
    m.textContent = message;
    m.className = "message";

    output.appendChild(m);
}

function updateUserlist(connected) {
    // fill user list
    let userlist = document.createElement("div");
    for (let user of connected) {
        let userEntry = document.createElement("div");
        userEntry.className = "user-connected";
        userEntry.dataset.userid = user.userid;

        let userImage = document.createElement("div");
        userImage.className = "user-image";
        userImage.innerHTML = toSvg(user.userid, 100);

        let userName = document.createElement("div");
        userName.className = "user-name";
        userName.innerHTML = user.username;

        userEntry.appendChild(userImage);
        userEntry.appendChild(userName);

        userlist.appendChild(userEntry);
    }
    document.getElementById("userlist").innerHTML = userlist.innerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    ws = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws");

    ws.onopen = function() {
        log("Connected to chatroom");
        document.getElementById("submit-icon").style.color = "#50913F";
        document.getElementById("submit").style.cursor = "pointer";
    };
    ws.onclose = function() {
        log("Disconnected from chatroom");
        document.getElementById("submit-icon").style.color = "darkgrey";
        document.getElementById("submit").style.cursor = "not-allowed";
        ws = null;
    };
    ws.onmessage = function(evt) {
        //log("RESPONSE: " + evt.data);

        let msg = JSON.parse(evt.data);
        switch (msg.action) {
            case "init":
                // fill user data
                document.getElementById("username").value = msg.user.username;
                document.getElementById("usericon").innerHTML = toSvg(msg.user.userid, 100);
                updateUserlist(msg.connected);
                break;
            case "broadcast":
                log(`${msg.sender.username}: ${msg.text}`);
                break;
            case "systemBroadcast":
                log(`${msg.text}`);
                break;
            case "updateUserlist":
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