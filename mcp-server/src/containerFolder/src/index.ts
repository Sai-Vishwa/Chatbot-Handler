import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { tool_mapper } from "./TOOLS/map/mapping.js";


import dotenv from "dotenv";
import { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
dotenv.config();



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



const mcpServer = new McpServer({
  name: "Marks_table_server_2",
  version: "1.0.0",
  capabilities:{
    resources:{},
    tools:{}
  }
})  

const tools : string[] = JSON.parse(process.env.TOOLS || "[]");

tools.map(tool => {
  mcpServer.tool(
    tool_mapper[tool].name,
    tool_mapper[tool].description,
    tool_mapper[tool].paramsSchemaOrAnnotations,
    tool_mapper[tool].handler
  )
})



app.post("/mcp", async (req: Request, res: Response) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator : undefined
  });
  res.on("close", () => {
    transport.close();
  });
  await mcpServer.connect(transport);
  await transport.handleRequest(req, res , req.body);
})

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the MCP Server");
});

app.listen(5000, () => {
  console.log("MCP Server is running on http://localhost:5000/mcp");
});