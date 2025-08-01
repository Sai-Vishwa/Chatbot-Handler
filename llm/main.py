import os
import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.llms import LlamaCpp
from llm_wrapper import LlamaCppWithFunctions
from langchain.agents import initialize_agent, AgentType
from langchain_core.tools import Tool
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
import httpx
import functools

# Load environment variables
load_dotenv()

# ───────────────────────────────
# FastAPI Setup
# ───────────────────────────────
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────────
# LLM Setup
# ───────────────────────────────
llm = LlamaCppWithFunctions(
    model_path=os.getenv("MODEL_PATH"),
    n_ctx=2048,
    temperature=0.7,
    max_tokens=512,
    stream=False,  # must be False for agents
    verbose=True
)

# ───────────────────────────────
# Memory Setup
# ───────────────────────────────
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True,
)

# ───────────────────────────────
# Tool Invocation Logic
# ───────────────────────────────
async def invoke_mcp(tool_name: str, input_args: dict) -> dict:
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "http://localhost:4005/invoke",
            json={"tool_name": tool_name, "input": input_args},
            timeout=30.0,
        )
        resp.raise_for_status()
        return resp.json()["output"]

async def load_tools():
    async with httpx.AsyncClient() as client:
        resp = await client.get("http://localhost:4005/all_tools")
        resp.raise_for_status()
        meta = resp.json()

    tools = []
    for tool_meta in meta["tools"]:
        tool_name = tool_meta["name"]
        tool_description = tool_meta["description"]

        async_tool_fn = functools.partial(invoke_mcp, tool_name)

        tool = Tool(
            name=tool_name,
            description=tool_description,
            func=lambda x: "Async only",
            coroutine=async_tool_fn
        )
        tools.append(tool)
    return tools

# ───────────────────────────────
# Global AgentExecutor
# ───────────────────────────────
agent_executor = None

@app.on_event("startup")
async def on_startup():
    global agent_executor
    tools = await load_tools()
    agent_executor = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        memory=memory,
        verbose=True,
        handle_parsing_errors=True,
    )

# ───────────────────────────────
# FastAPI Models
# ───────────────────────────────
class PromptInput(BaseModel):
    prompt: str

class PromptOutput(BaseModel):
    response: str

# ───────────────────────────────
# /generate Endpoint
# ───────────────────────────────
@app.post("/generate", response_model=PromptOutput)
async def generate(req: PromptInput):
    global agent_executor
    result = await agent_executor.arun(req.prompt)
    return {"response": result}

# ───────────────────────────────
# Run app
# ───────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
