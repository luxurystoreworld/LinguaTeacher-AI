// ======================================
// LinguaTeacher AI Voice Engine
// ======================================

const VoiceEngine = {

    enabled: true,

    speaking: false,

    voice: null,

    init() {

        if (!("speechSynthesis" in window)) {

            console.log("Speech synthesis not supported");

            return;

        }

        speechSynthesis.onvoiceschanged = () => {

            const voices = speechSynthesis.getVoices();

            this.voice =
                voices.find(v => v.lang.startsWith("en"))
                || voices[0];

            console.log("Voice loaded:", this.voice);

        };

    },

    speak(text) {

        if (!this.enabled) return;

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.voice = this.voice;

        utterance.rate = 1;

        utterance.pitch = 1;

        utterance.volume = 1;

        utterance.onstart = () => {

            this.speaking = true;

        };

        utterance.onend = () => {

            this.speaking = false;

        };

        speechSynthesis.speak(utterance);

    },

    stop() {

        speechSynthesis.cancel();

        this.speaking = false;

    }

};