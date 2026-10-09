// ======================================
// LinguaTeacher AI v3 UI
// ======================================

let AI = {};

function initUI() {

    AI.messages = document.getElementById("chatMessages");

    AI.input = document.getElementById("userInput");

    AI.send = document.getElementById("sendButton");

    AI.voice = document.getElementById("voiceButton");

    AI.camera = document.getElementById("cameraButton");

    AI.files = document.getElementById("fileButton");

    AI.settings = document.getElementById("settingsButton");

    AI.history = [];

    console.log("LinguaTeacher AI UI loaded");

    createMessage(
        "👋 Hello! I'm LinguaTeacher AI. How can I help you today?",
        "ai"
    );

}

function createMessage(text, sender = "ai") {

    if (!AI.messages) return;

    const wrapper = document.createElement("div");

    wrapper.className =
        sender === "user"
            ? "user-message"
            : "ai-message";

    const bubble = document.createElement("div");

    bubble.className =
        sender === "user"
            ? "bubble user-bubble"
            : "bubble ai-bubble";

    bubble.textContent = text;

    wrapper.appendChild(bubble);

    AI.messages.appendChild(wrapper);

    AI.history.push({
        sender: sender,
        text: text,
        time: new Date()
    });

    scrollBottom();

}

function createThinking() {

    if (!AI.messages) return;

    removeThinking();

    const wrapper = document.createElement("div");

    wrapper.className = "ai-message";

    wrapper.id = "thinking";

    wrapper.innerHTML = `
        <div class="bubble ai-bubble">
            🤖 Thinking...
        </div>
    `;

    AI.messages.appendChild(wrapper);

    scrollBottom();

}

function removeThinking() {

    const thinking = document.getElementById("thinking");

    if (thinking) {

        thinking.remove();

    }

}

function clearChat() {

    if (!AI.messages) return;

    AI.messages.innerHTML = "";

    AI.history = [];

    createMessage(
        "👋 Hello! I'm LinguaTeacher AI. How can I help you today?",
        "ai"
    );

}

function scrollBottom() {

    if (!AI.messages) return;

    AI.messages.scrollTop =
        AI.messages.scrollHeight;

}