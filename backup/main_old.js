document.getElementById("hero").innerHTML = `

<section class="hero">

<div class="hero-overlay"></div>

<div class="hero-content">

<div class="hero-left">

<div class="hero-badge">
🚀 Powered by Google Gemini AI
</div>

<h1>
Learn Languages
<br>
with Artificial Intelligence
</h1>

<p>
Practice speaking, grammar, pronunciation and vocabulary with your own AI teacher available 24/7.
</p>

<div class="hero-buttons">

<a href="/ai" class="btn-primary">
🚀 Try AI Free
</a>

<a href="/about" class="btn-secondary">
▶ Watch Demo
</a>

</div>

<div class="hero-stats">

<div class="stat-box">
<h2>50K+</h2>
<p>Students</p>
</div>

<div class="stat-box">
<h2>1000+</h2>
<p>Lessons</p>
</div>

<div class="stat-box">
<h2>4.9 ⭐</h2>
<p>Rating</p>
</div>

</div>

</div>

<div class="hero-right">

<div class="glass-card">

<div class="robot">
🤖
</div>

<h2>LinguaTeacher AI</h2>

<p>Your personal AI teacher</p>

<div class="online">
🟢 Online
</div>

</div>

<div class="floating-circle circle1"></div>
<div class="floating-circle circle2"></div>
<div class="floating-circle circle3"></div>

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