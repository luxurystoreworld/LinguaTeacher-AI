// ======================================
// LinguaTeacher AI Voice
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

    recognition.onstart = () => {

        AI.voice.innerHTML = "🔴";

    };

    recognition.onend = () => {

        AI.voice.innerHTML = "🎤";

    };

    recognition.onresult = (event) => {

        let text = "";

        for (let i = 0; i < event.results.length; i++) {

            text += event.results[i][0].transcript;

        }

        AI.input.value = text;

        AI.input.focus();

    };

    recognition.onerror = (event) => {

        console.log(event.error);

    };

    AI.voice.onclick = () => {

        recognition.start();

    };

}