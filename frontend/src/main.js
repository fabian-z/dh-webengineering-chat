import {
    toSvg as generateIdenticon,
} from "jdenticon";

let ws;
let username = "Anonymous";
let identicons = new Map();

function getIdenticon(userid) {
    if (identicons.has(userid)) {
        return identicons.get(userid);
    } else {
        let icon = generateIdenticon(userid, 100);
        identicons.set(userid, icon);
        return icon;
    }
}

function appendMessage(text) {
    let m = document.createElement("div");
    let output = document.getElementById("messages");
    m.textContent = text;
    m.className = "message";

    let oldScrollHeight = output.scrollHeight;
    output.appendChild(m);
    conditionalMessageScroll(oldScrollHeight);
}

function appendMessageWithIcon(msg, textOverride) {
    let m = document.createElement("div");
    m.className = "message";

    let text = document.createElement("div");
    text.className = "message-text";

    if (textOverride) {
        text.textContent = textOverride;
    } else {
        text.textContent = `${msg.sender.username}: ${msg.text}`;
    }


    let identicon = document.createElement("div");
    identicon.className = "message-image";
    identicon.innerHTML = getIdenticon(msg.sender.userid, 100);

    m.appendChild(identicon);
    m.appendChild(text);

    let messages = document.getElementById("messages");
    let oldScrollHeight = messages.scrollHeight;
    messages.appendChild(m);
    conditionalMessageScroll(oldScrollHeight);
}

function initUserlist(connected) {
    // fill user list
    let userlist = document.createElement("div");
    for (let user of connected) {
        let userEntry = document.createElement("div");
        userEntry.className = "user-connected";
        userEntry.dataset.userid = user.userid;

        let userImage = document.createElement("div");
        userImage.className = "user-image";
        userImage.innerHTML = getIdenticon(user.userid, 100);

        let userName = document.createElement("div");
        userName.className = "user-name";
        userName.innerText = user.username;

        userEntry.appendChild(userImage);
        userEntry.appendChild(userName);

        userlist.appendChild(userEntry);
    }
    document.getElementById("userlist").innerHTML = userlist.innerHTML;
}

function conditionalMessageScroll(oldScrollHeight) {
    let messages = document.getElementById("messages");
    if (oldScrollHeight === messages.scrollTop + messages.clientHeight) {
        // only scroll if scrolled to bottom before
        messages.scrollTop = messages.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    ws = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws");

    ws.onopen = function() {
        appendMessage("Connected to chatroom");
        document.getElementById("submit-icon").style.color = "#50913F";
        document.getElementById("submit").style.cursor = "pointer";
    };

    ws.onclose = function() {
        appendMessage("Disconnected from chatroom");
        document.getElementById("submit-icon").style.color = "darkgrey";
        document.getElementById("submit").style.cursor = "not-allowed";
        ws = null;
    };

    ws.onmessage = function(evt) {
        //log("RESPONSE: " + evt.data);

        let msg = JSON.parse(evt.data);
        switch (msg.action) {
            case "init": {
                // fill user data
                document.getElementById("username").value = msg.user.username;
                document.getElementById("usericon").innerHTML = getIdenticon(msg.user.userid, 100);
                initUserlist(msg.connected);
                break;
            }
            case "broadcast": {
                appendMessageWithIcon(msg);
                break;
            }
            case "systemBroadcast": {
                appendMessage(`${msg.text}`);
                break;
            }
            case "newUser": {
                let userEntry = document.createElement("div");
                userEntry.className = "user-connected";
                userEntry.dataset.userid = msg.sender.userid;

                let userImage = document.createElement("div");
                userImage.className = "user-image";
                userImage.innerHTML = getIdenticon(msg.sender.userid, 100);

                let userName = document.createElement("div");
                userName.className = "user-name";
                userName.innerText = msg.sender.username;

                userEntry.appendChild(userImage);
                userEntry.appendChild(userName);

                document.getElementById("userlist").appendChild(userEntry);
                break;
            }
            case "removeUser": {
                document.querySelectorAll(`.user-connected[data-userid='${msg.sender.userid}']`)[0].remove();
                identicons.delete(msg.sender.userid);
                break;
            }
            case "usernameChange": {
                appendMessageWithIcon(msg, `Changed name to ${msg.sender.username}`);

                let userElem = document.querySelector(`.user-connected[data-userid='${msg.sender.userid}']`);
                if (userElem) {
                    let usernameElem = userElem.children[1];
                    usernameElem.textContent = msg.sender.username;
                }
                break;
            }
            default: {
                console.log("Unhandled message action:", msg);
            }
        }
    };
    ws.onerror = function(evt) {
        appendMessage("ERROR: " + evt.data);
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

    ws.send(JSON.stringify(msg));
    input.value = "";
    return false;
}, false);

document.getElementById("message-entry").addEventListener("keypress", function(evt) {
    if (evt.key === "Enter" && evt.shiftKey) {
        document.getElementById("submit").click();
        evt.preventDefault();
    }
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