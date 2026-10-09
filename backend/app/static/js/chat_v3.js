const messages = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

// ---------- Добавление сообщения ----------

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    message.innerHTML = `
        <div class="bubble">
            ${text}
        </div>
    `;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

}

// ---------- Отправка ----------

async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    addMessage("🤖 Thinking...", "ai");

    const thinking = messages.lastElementChild;

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message: text

            })

        });

        const data = await response.json();

        thinking.remove();

        addMessage(data.reply, "ai");

    }

    catch (error) {

        thinking.remove();

        addMessage("❌ Connection error", "ai");

        console.error(error);

    }

}

// ---------- Кнопки ----------

sendButton.onclick = sendMessage;

input.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        sendMessage();

    }

});

// ---------- Первое сообщение ----------

addMessage(
    "👋 Hello! I am LinguaTeacher AI. How can I help you today?",
    "ai"
);