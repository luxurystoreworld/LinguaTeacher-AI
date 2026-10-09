window.addEventListener("DOMContentLoaded", () => {

    if (typeof initUI === "function") {
    initUI();
}

    if (typeof initChat === "function") {
        initChat();
    }

    if (typeof initVoice === "function") {
        initVoice();
    }

    if (typeof initCamera === "function") {
        initCamera();
    }

    if (typeof initFiles === "function") {
        initFiles();
    }

    if (typeof initSettings === "function") {
        initSettings();
    }

});