from llama_cpp import Llama
from dotenv import load_dotenv
import os

model_path = os.getenv("MODEL_PATH")

llm = Llama(
    model_path=model_path
    n_ctx=2048,  
    n_threads=6 
)

output = llm("Q: How do birds fly?\nA:", max_tokens=64)

print(output["choices"][0]["text"])
