// =====================================
// LinguaTeacher AI v2 Chat
// =====================================

const chatWindow = document.querySelector(".chat-messages");
const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

function scrollBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addUserMessage(text) {

    const div = document.createElement("div");

    div.className = "user-message";

    div.innerHTML = `
        <div class="bubble user-bubble">
            ${text}
        </div>
    `;

    chatWindow.appendChild(div);

    scrollBottom();
}

function addAIMessage(text) {

    const div = document.createElement("div");

    div.className = "ai-message";

    div.innerHTML = `
        <div class="bubble ai-bubble">
            ${text}
        </div>
    `;

    chatWindow.appendChild(div);

    scrollBottom();
}

function addThinking() {

    const div = document.createElement("div");

    div.className = "ai-message thinking";

    div.id = "thinking";

    div.innerHTML = `
        <div class="bubble ai-bubble">
            🤖 Thinking...
        </div>
    `;

    chatWindow.appendChild(div);

    scrollBottom();
}

function removeThinking() {

    const thinking = document.getElementById("thinking");

    if (thinking) thinking.remove();

}

async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    addUserMessage(text);

    input.value = "";

    addThinking();

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });

        const data = await response.json();

        removeThinking();

        addAIMessage(data.reply);

    }

    catch (e) {

        removeThinking();

        addAIMessage("❌ Connection error");

        console.error(e);

    }

}

sendButton.onclick = sendMessage;

input.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        sendMessage();

    }

});