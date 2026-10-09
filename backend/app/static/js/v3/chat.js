// ========================================
// LinguaTeacher AI v3 Chat
// ========================================

function initChat() {

    if (!AI.send) return;

    AI.send.onclick = sendMessage;

    AI.input.addEventListener("keydown", function(e){

        if(e.key==="Enter" && !e.shiftKey){

            e.preventDefault();

            sendMessage();

        }

    });

}

async function sendMessage(){

    const text = AI.input.value.trim();

    if(!text) return;

    createMessage(text,"user");

    AI.input.value="";

    createThinking();

    AI.send.disabled=true;

    try{

        const response=await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                message:text

            })

        });

        const data=await response.json();

        removeThinking();

        if(data.reply){

            createMessage(data.reply,"ai");

        }else{

            createMessage("❌ Empty response","ai");

        }

    }

    catch(error){

        console.error(error);

        removeThinking();

        createMessage("❌ Connection error","ai");

    }

    AI.send.disabled=false;

    AI.input.focus();

}