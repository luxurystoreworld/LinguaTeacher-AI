document.getElementById("hero").innerHTML = `

<section class="hero">

<div class="hero-left">

<div class="hero-badge">
🚀 AI Powered by Google Gemini
</div>

<h1>
Speak Any Language
with Artificial Intelligence
</h1>

<p>
Practice speaking, pronunciation, grammar and vocabulary with your own personal AI teacher available 24/7.
</p>

<div class="hero-buttons">

<a href="/ai" class="start-btn">
🚀 Try AI Free
</a>

<a href="/about" class="demo-btn">
▶ Watch Demo
</a>

</div>

<div class="hero-stats">

<div class="stat">
<h3>50K+</h3>
<span>Students</span>
</div>

<div class="stat">
<h3>1000+</h3>
<span>Lessons</span>
</div>

<div class="stat">
<h3>4.9⭐</h3>
<span>Rating</span>
</div>

</div>

</div>

<div class="hero-right">

<div class="robot-card">

<div class="robot">
🤖
</div>

<h2>AI Teacher</h2>

<p>Voice • Chat • Grammar</p>

<div class="online">
🟢 Online
</div>

</div>

</div>

</section>

`;
// ===========================
// LOGIN
// ===========================

function openLogin() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeLogin() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// ===========================
// REGISTER
// ===========================

function openRegister() {
    const modal = document.getElementById("registerModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeRegister() {
    const modal = document.getElementById("registerModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// ===========================
// CLOSE MODAL
// ===========================

window.onclick = function(event) {

    const login = document.getElementById("loginModal");
    const register = document.getElementById("registerModal");

    if (login && event.target === login) {
        closeLogin();
    }

    if (register && event.target === register) {
        closeRegister();
    }

}