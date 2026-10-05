from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
import base64
import os

from dotenv import load_dotenv

from backend.app.gemini_live import GeminiLive

load_dotenv()

router = APIRouter()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = "models/gemini-2.5-flash-native-audio-latest"


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await websocket.accept()

    audio_input_queue = asyncio.Queue()
    video_input_queue = asyncio.Queue()
    text_input_queue = asyncio.Queue()

    async def audio_output_callback(data):
        await websocket.send_bytes(data)

    async def audio_interrupt_callback():
        pass

    gemini_client = GeminiLive(
        api_key=GEMINI_API_KEY,
        model=MODEL,
        input_sample_rate=16000
    )

    async def receive_from_client():

        try:

            while True:

                message = await websocket.receive()

                if message.get("bytes"):

                    await audio_input_queue.put(
                        message["bytes"]
                    )

                elif message.get("text"):

                    text = message["text"]

                    try:

                        payload = json.loads(text)

                        if payload.get("type") == "image":

                            image = base64.b64decode(
                                payload["data"]
                            )

                            await video_input_queue.put(
                                image
                            )

                            continue

                    except:

                        pass

                    await text_input_queue.put(text)

        except WebSocketDisconnect:

            return

    receive_task = asyncio.create_task(
        receive_from_client()
    )

    try:

        async for event in gemini_client.start_session(

            audio_input_queue=audio_input_queue,

            video_input_queue=video_input_queue,

            text_input_queue=text_input_queue,

            audio_output_callback=audio_output_callback,

            audio_interrupt_callback=audio_interrupt_callback

        ):

            if event:

                await websocket.send_json(event)

    finally:
       receive_task.cancel()