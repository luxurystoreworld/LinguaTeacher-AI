// ======================================
// LinguaTeacher AI Voice v2
// ======================================

let recognition = null;

function initVoice() {

    if (!AI.voice) return;

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        AI.voice.disabled = true;
        AI.voice.title = "Speech Recognition not supported";

        console.log("Speech Recognition not supported");

        return;

    }

    recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = true;

    recognition.continuous = false;

    recognition.maxAlternatives = 1;

    recognition.onstart = () => {

        AI.voice.innerHTML = "🔴";

        AI.voice.style.background = "#dc2626";

    };

    recognition.onend = () => {

        AI.voice.innerHTML = "🎤";

        AI.voice.style.background = "";

    };

    recognition.onresult = (event) => {

        let text = "";

        for (let i = 0; i < event.results.length; i++) {

            text += event.results[i][0].transcript;

        }

        AI.input.value = text;

    };

    recognition.onerror = (event) => {

        console.log("Voice error:", event.error);

    };

    recognition.onend = () => {

        AI.voice.innerHTML = "🎤";

        AI.voice.style.background = "";

        if (AI.input.value.trim() !== "") {

            sendMessage();

        }

    };

    AI.voice.onclick = () => {

        recognition.start();

    };

}