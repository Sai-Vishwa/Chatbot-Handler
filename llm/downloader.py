from huggingface_hub import hf_hub_download
from dotenv import load_dotenv
import os

token = os.getenv("TOKEN")

model_path = hf_hub_download(
    repo_id="TheBloke/Mistral-7B-Instruct-v0.2-GGUF",
    filename="mistral-7b-instruct-v0.2.Q3_K_L.gguf",
    token=token
)

print("Model saved at:", model_path)
