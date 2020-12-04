let ws;

function log(message) {
    let m = document.createElement("div");
    let output = document.getElementById("messages");
    m.textContent = message;
    output.appendChild(m);
}

document.addEventListener('DOMContentLoaded', function() {
    ws = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws");

    ws.onopen = function() {
        log("OPEN");
    };
    ws.onclose = function() {
        log("CLOSE");
        ws = null;
    };
    ws.onmessage = function(evt) {
        log("RESPONSE: " + evt.data);
    };
    ws.onerror = function(evt) {
        log("ERROR: " + evt.data);
    };

}, false);

document.getElementById("submit").addEventListener("click", function() {
    console.log(ws);
    let input = document.getElementById("message-entry");

    if (!ws) {
        return false;
    }
    log("SEND: " + input.value);
    ws.send(input.value);
    return false;
}, false);