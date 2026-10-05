let pc = null;
let dc = null;
let remoteAudio = null;

const mic = document.getElementById("mic");
const status = document.getElementById("status");

mic.onclick = async () => {
    try {

        status.textContent = "🎤 Запрашиваем микрофон...";

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        pc = new RTCPeerConnection();

        remoteAudio = document.createElement("audio");
        remoteAudio.autoplay = true;

        pc.ontrack = (event) => {
            remoteAudio.srcObject = event.streams[0];
        };

        stream.getTracks().forEach(track => {
            pc.addTrack(track, stream);
        });

        dc = pc.createDataChannel("oai-events");

        dc.onopen = () => {
            status.textContent = "🟢 Подключено";
            mic.style.background = "#22c55e";
            mic.style.color = "#ffffff";
        };

        dc.onmessage = (event) => {
            console.log(event.data);
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        while (pc.iceGatheringState !== "complete") {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        status.textContent = "🔄 Подключение...";

        const response = await fetch("/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/sdp"
            },
            body: pc.localDescription.sdp
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const answer = await response.text();

        await pc.setRemoteDescription({
            type: "answer",
            sdp: answer
        });

        status.textContent = "🟢 Connected";

        dc.onclose = () => {
            status.textContent = "🔴 Соединение закрыто";
            mic.style.background = "#2563eb";
            mic.style.color = "#ffffff";
        };

        dc.onerror = (error) => {
            console.error(error);
        };

    } catch (error) {

        console.error(error);

        status.textContent = "❌ Ошибка подключения";

        mic.style.background = "#ef4444";
        mic.style.color = "#ffffff";

        if (dc) {
            dc.close();
            dc = null;
        }

        if (pc) {
            pc.close();
            pc = null;
        }
    }
};