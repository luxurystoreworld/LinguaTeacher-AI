// ========================================
// LinguaTeacher AI — Chat Frontend
// ========================================

// SIDEBAR
const sidebar = document.getElementById("sidebar");

if (sidebar) {
    sidebar.innerHTML = `
        <div class="ai-sidebar">
            <div class="ai-logo">
                🤖 LinguaTeacher AI
            </div>

            <button class="new-chat" id="newChatButton">
                ➕ New Chat
            </button>

            <div class="menu">
                <a href="/">🏠 Home</a>
                <a href="/german">🇩🇪 German</a>
                <a href="/english">🇬🇧 English</a>
                <a href="/profile">👤 Profile</a>
                <a href="/about">ℹ️ About</a>
            </div>
        </div>
    `;
}

// CHAT HEADER
const chatHeader = document.getElementById("chat-header");

if (chatHeader) {
    chatHeader.innerHTML = `
        <div class="chat-header">
            <h2>AI Teacher</h2>
            <p>Powered by Google Gemini</p>
        </div>
    `;
}

// CHAT WINDOW
const chatWindow = document.getElementById("chat-window");

if (chatWindow) {
    chatWindow.innerHTML = `
        <div class="chat-messages" id="chatMessages">
            <div class="ai-message">
                👋 Hello! I'm your AI Teacher.
                How can I help you today?
            </div>
        </div>
    `;
}

// CHAT INPUT
const chatInput = document.getElementById("chat-input");

if (chatInput) {
    chatInput.innerHTML = `
        <div class="chat-input-box">
            <input
                id="userInput"
                type="text"
                placeholder="Ask me anything..."
                autocomplete="off"
            >

            <button id="voiceButton" type="button"
                    title="Voice input">
                🎤
            </button>

            <button id="sendButton" type="button"
                    title="Send message">
                ➤
            </button>
        </div>
    `;
}

// ELEMENTS
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const voiceButton = document.getElementById("voiceButton");
const chatMessages = document.getElementById("chatMessages");
const newChatButton = document.getElementById("newChatButton");

// ADD MESSAGE SAFELY
function addMessage(text, type) {

    const wrapper = document.createElement("div");

    wrapper.className =
        type === "user"
            ? "user-message"
            : "ai-message";

    const bubble = document.createElement("div");

    bubble.className =
        type === "user"
            ? "bubble user-bubble"
            : "bubble ai-bubble";

    bubble.textContent = text;

    wrapper.appendChild(bubble);

    chatMessages.appendChild(wrapper);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return bubble;

}

// SEND MESSAGE TO AI
async function sendMessage() {
    const message = userInput.value.trim();

    if (!message || sendButton.disabled) {
        return;
    }

    // Show user's message in the chat.
    addMessage(message, "user");

    userInput.value = "";
    sendButton.disabled = true;

    // Show loading indicator.
    const loadingMessage = addMessage(
        "🤖 Thinking...",
        "ai"
    );

    try {
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

        if (!response.ok) {
            throw new Error(
                data.detail || data.reply ||
                "The server could not process your request."
            );
        }

        if (typeof data.reply !== "string") {
            throw new Error("The AI returned an invalid response.");
        }

        // Replace loading message with AI response.
        loadingMessage.textContent = data.reply;

    } catch (error) {
        console.error("Chat error:", error);

        loadingMessage.textContent =
            "❌ Sorry, something went wrong. Please try again.";

    } finally {
        sendButton.disabled = false;
        userInput.focus();
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// SEND BUTTON
sendButton.addEventListener("click", sendMessage);

// ENTER KEY
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// NEW CHAT
newChatButton.addEventListener("click", function () {
    chatMessages.innerHTML = `
        <div class="ai-message">
            👋 Hello! I'm your AI Teacher.
            How can I help you today?
        </div>
    `;

    userInput.value = "";
    userInput.focus();
});

// VOICE INPUT
if (
    "webkitSpeechRecognition" in window ||
    "SpeechRecognition" in window
) {
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceButton.addEventListener("click", function () {
        recognition.start();
    });

    recognition.onresult = function (event) {
        userInput.value =
            event.results[0][0].transcript;

        userInput.focus();
    };

    recognition.onerror = function (event) {
        console.error("Voice input error:", event.error);
    };

} else {
    voiceButton.addEventListener("click", function () {
        addMessage(
            "Voice input is not supported in this browser. Please type your message.",
            "ai"
        );
    });
}