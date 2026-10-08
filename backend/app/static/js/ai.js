// ==============================
// SIDEBAR
// ==============================

document.getElementById("sidebar").innerHTML = `

<div class="ai-sidebar">

<div class="ai-logo">

🤖 LinguaTeacher AI

</div>

<button class="new-chat">

➕ New Chat

</button>

<div class="menu">

<a href="/">🏠 Home</a>

<a href="/german">🇩🇪 German</a>

<a href="/english">🇬🇧 English</a>

<a href="/profile">👤 Profile</a>

<a href="/about">ℹ About</a>

</div>

</div>

`;

// ==============================
// CHAT HEADER
// ==============================

document.getElementById("chat-header").innerHTML = `

<div class="chat-header">

<h2>AI Teacher</h2>

<p>Powered by Google Gemini</p>

</div>

`;

// ==============================
// CHAT WINDOW
// ==============================

document.getElementById("chat-window").innerHTML = `

<div class="chat-messages">

<div class="ai-message">

👋 Hello! I'm your AI Teacher.
How can I help you today?

</div>

</div>

`;

// ==============================
// CHAT INPUT
// ==============================

document.getElementById("chat-input").innerHTML = `

<div class="chat-input-box">

<input
id="userInput"
type="text"
placeholder="Ask me anything...">

<button id="voiceButton">
🎤
</button>

<button id="sendButton">
➤
</button>

</div>

`;
// ==============================
// SEND MESSAGE
// ==============================

const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");

sendButton.addEventListener("click", async function () {

    const message = userInput.value.trim();

    if (!message) return;

    console.log("User:", message);

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    });

    const data = await response.json();

    console.log("AI:", data.reply);

    const messages = document.querySelector(".chat-messages");

messages.innerHTML += `
<div class="user-message">
${message}
</div>

<div class="ai-message">
${data.reply}
</div>
`;

messages.scrollTop = messages.scrollHeight;