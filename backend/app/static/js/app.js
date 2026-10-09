// ========================================
// LinguaTeacher AI v3
// Main App
// ========================================

const AI = {

    messages: document.getElementById("chatMessages"),

    input: document.getElementById("userInput"),

    send: document.getElementById("sendButton"),

    voice: document.getElementById("voiceButton"),

    camera: document.getElementById("cameraButton"),

    stop: document.getElementById("stopButton"),

    speaking: false,

    recognition: null,

    stream: null

};

window.AI = AI;

document.addEventListener("DOMContentLoaded", () => {

    console.log("LinguaTeacher AI v3 loaded");

    if (typeof initUI === "function") initUI();

    if (typeof initChat === "function") initChat();

    if (typeof initVoice === "function") initVoice();

    if (typeof initCamera === "function") initCamera();

    if (typeof initFiles === "function") initFiles();

    if (typeof initSettings === "function") initSettings();

});