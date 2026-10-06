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