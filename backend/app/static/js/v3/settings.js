// =====================================
// LinguaTeacher AI Settings
// =====================================

function initSettings() {

    AI.settings = {

        voiceEnabled: true,

        speechRate: 1,

        speechPitch: 1,

        speechVolume: 1,

        language: "en-US"

    };

}

function speak(text){

    if(!AI.settings.voiceEnabled) return;

    if(!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = AI.settings.language;

    utterance.rate = AI.settings.speechRate;

    utterance.pitch = AI.settings.speechPitch;

    utterance.volume = AI.settings.speechVolume;

    speechSynthesis.speak(utterance);

}