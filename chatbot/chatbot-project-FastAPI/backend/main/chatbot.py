import httpx
from fastapi import HTTPException

class ChatbotManager:
    async def call_rasa_nlu(self, question: str):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:5005/model/parse",
                json={ "text": question }
            )
            if response.status_code != 200:
                raise HTTPException(status_code=500, detail="Rasa NLU 호출 실패")
            return response.json()

    async def call_rasa_core(self, sender: str, message: str):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:5005/webhooks/rest/webhook",
                json={ "sender": sender, "message": message }
            )
            if response.status_code != 200:
                raise HTTPException(status_code=500, detail="Rasa Core 호출 실패")
            return response.json()
