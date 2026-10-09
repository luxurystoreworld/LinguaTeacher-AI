// =====================================
// LinguaTeacher AI Core
// =====================================

const AI = {

    messages: null,

    input: null,

    send: null,

    voice: null,

    camera: null,

    files: null,

    settings: {},

    chatHistory: []

};

window.addEventListener("DOMContentLoaded", () => {

    AI.messages = document.getElementById("chatMessages");
    AI.input = document.getElementById("userInput");
    AI.send = document.getElementById("sendButton");
    AI.voice = document.getElementById("voiceButton");
    AI.camera = document.getElementById("cameraButton");
    AI.files = document.getElementById("fileButton");

    if (typeof initUI === "function") initUI();

    if (typeof initChat === "function") initChat();

    if (typeof initVoice === "function") initVoice();
    if (typeof VoiceEngine !== "undefined") {

    VoiceEngine.init();

}

    if (typeof initCamera === "function") initCamera();

    if (typeof initFiles === "function") initFiles();

    if (typeof initSettings === "function") initSettings();

});