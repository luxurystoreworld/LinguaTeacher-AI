// =======================================
// LinguaTeacher AI 2.0 UI
// =======================================

let AI = {};

function initUI() {

    document.getElementById("app").innerHTML = `

<div class="sidebar">

    <div class="logo">
        🤖 LinguaTeacher
    </div>

    <div class="menu">

        <button id="newChat">
            ➕ New Chat
        </button>

        <button>
            🇩🇪 German
        </button>

        <button>
            🇬🇧 English
        </button>

        <button>
            ⚙ Settings
        </button>

    </div>

</div>

<div class="main">

    <div class="header">

        <h2>Gemini AI Teacher</h2>

        <div>

            <button class="circle" id="cameraBtn">📷</button>

            <button class="circle" id="fileBtn">📎</button>

            <button class="circle" id="voiceBtn">🎤</button>

        </div>

    </div>

    <div class="chat" id="messages">

    </div>

    <div class="bottom">

        <input
            id="userInput"
            placeholder="Ask anything..."
        >

        <button class="circle send" id="sendBtn">
            ➤
        </button>

    </div>

</div>

`;

    AI.messages = document.getElementById("messages");
    AI.input = document.getElementById("userInput");
    AI.send = document.getElementById("sendBtn");

    createMessage(
        "👋 Hello! I'm LinguaTeacher AI. How can I help you today?",
        "ai"
    );

}

function createMessage(text, sender = "ai") {

    const message = document.createElement("div");

    message.className = "message " + sender;

    message.innerHTML = `
        <div class="bubble">
            ${text}
        </div>
    `;

    AI.messages.appendChild(message);

    AI.messages.scrollTop = AI.messages.scrollHeight;

    return message;

}

function createThinking() {

    return createMessage(
        "🤖 Thinking...",
        "ai"
    );

}