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
type="text"
placeholder="Ask me anything...">

<button>

🎤

</button>

<button>

➤

</button>

</div>

`;