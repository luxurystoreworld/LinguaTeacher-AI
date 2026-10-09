// ======================================
// LinguaTeacher AI Chat v4
// ======================================

let conversation = [];

function initChat() {

    if (!AI.send) return;

    AI.send.onclick = sendMessage;

    AI.input.addEventListener("keydown", function (e) {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            sendMessage();

        }

    });

}

async function sendMessage() {

    const text = AI.input.value.trim();

    if (!text) return;

    createMessage(text, "user");

    conversation.push({
        role: "user",
        content: text
    });

    AI.input.value = "";

    createThinking();

    AI.send.disabled = true;

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: text,

                history: conversation

            })

        });

        const data = await response.json();

        removeThinking();

        createMessage(data.reply, "ai");

        conversation.push({

            role: "assistant",

            content: data.reply

        });

    } catch (err) {

        removeThinking();

        createMessage("❌ Connection error", "ai");

    }

    AI.send.disabled = false;

    AI.input.focus();

}