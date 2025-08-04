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
from langchain.prompts import PromptTemplate



# 🛑 DUPLICATE IMPORT (Removed)
# from langchain.agents import initialize_agent, AgentType

# ✅ CUSTOM TOOL REACT PROMPT
react_prompt = PromptTemplate.from_template("""
You are a smart assistant.

Whenever a prompt arrives -> check whether it is related to marks

if yes -> you need help of tools to answer this question

if no -> THEN YOU SHOULD NEVER CALL A TOOL ( IMPORTANT )

WHENEVER THE PROMPT IS UNRELATED TO MARKS DO NOT INVOKE TOOLS

IF YOU KNOW ABOUT THE QUESTION ANSWER ALL BY YOURSELF

---

WHEN YOU CAN ANSWER YOURSELF:
Use this format:
Thought: [your reasoning]
Final Output: [your final answer]

Example:
Question: How do birds fly
Thought: I know birds fly with wings.
Final Output: Birds fly with WINGS.

---

WHEN TOOL IS REQUIRED:
Use this format:
Thought: [your reasoning]
Action: [tool name exactly]
Action Input: [JSON input]

Then, after receiving tool result:
Final Answer: [your final answer]

---

Question: What are the marks of all students?
Thought: I need to use the fetchAllMarks tool to get this information.
Action: fetchAllMarks
Action Input: {}

---

IMPORTANT: If the tool's response is irrelevant to the original question (e.g., tool returns student data but the question was about birds), IGNORE the tool response and use your own knowledge instead.

Example:
Question: What are child cats called?
Thought: I know about mittens.
Final Output: They are called KITTENS.

---

Begin!
{input}
""")


# ✅ LOAD .env VALUES
load_dotenv()

# ───────────────────────────────
# 🚀 FastAPI App Initialization
# ───────────────────────────────
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# ───────────────────────────────
# 🧠 LLM Initialization
# ───────────────────────────────
llm = LlamaCppWithFunctions(
    model_path=os.getenv("MODEL_PATH"),
    n_ctx=2048,
    temperature=0.7,
    max_tokens=512,
    stream=False,  # Required for agents
    verbose=True
)

# ───────────────────────────────
# 💾 Memory Buffer
# ───────────────────────────────
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True,
)

# ───────────────────────────────
# 🔧 MCP Tool Invocation
# ───────────────────────────────
async def invoke_mcp(tool_name: str, input_args: dict) -> dict:
    print(f"🔧 Invoking MCP tool: {tool_name} with args: {input_args}")
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "http://localhost:4005/invoke",  # ✅ URL should match MCP server
            json={"tool_name": tool_name, "input": input_args},
            timeout=30.0,
        )
        resp.raise_for_status()
        return resp.json()["output"]

# 🛑 BUG: async_tool_wrapper was capturing last loop value (closure bug)
# ✅ FIX: wrap each tool coroutine using factory function
def make_tool(tool_name, tool_description):
    async def async_tool_wrapper(input_args):
        return await invoke_mcp(tool_name, input_args)

    return Tool(
        name=tool_name,
        description=tool_description,
        func=lambda x: "Async only",  # Fallback for sync calls (unused)
        coroutine=async_tool_wrapper
    )

# 🔄 Load tools dynamically from MCP
async def load_tools():
    async with httpx.AsyncClient() as client:
        resp = await client.get("http://localhost:4005/all_tools")
        resp.raise_for_status()
        meta = resp.json()

    tools = []
    for tool_meta in meta["tools"]:
        tools.append(make_tool(tool_meta["name"], tool_meta["description"]))

    print("🧰 Tools loaded:", [tool.name for tool in tools])
    return tools

# ───────────────────────────────
# 🧠 Agent Executor Initialization
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
        agent_kwargs={
            "system_message": react_prompt  # ✅ Note: This works only if your model supports system_message
        }
    )

# ───────────────────────────────
# 📤 Request/Response Models
# ───────────────────────────────
class PromptInput(BaseModel):
    prompt: str

class PromptOutput(BaseModel):
    response: str

# ───────────────────────────────
# 🧪 Chat Route
# ───────────────────────────────
@app.post("/generate", response_model=PromptOutput)
async def generate(req: PromptInput):
    print("REQUEST I GOT IS  -  "+req.prompt)
    global agent_executor
    result = await agent_executor.arun(req.prompt)
    print("📤 Agent Response:", result)
    return {"response": result}

# ───────────────────────────────
# ▶ Run Server
# ───────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
