
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import router from "./router/router.js";


const mcpServer = new McpServer({
  name: "Marks_table_server_2",
  version: "1.0.0",
  capabilities:{
    resources:{},
    tools:{}
  }
})  



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router)



// app.post("/mcp", async (req: Request, res: Response) => {
//   const transport = new StreamableHTTPServerTransport({
//     sessionIdGenerator : undefined
//   });
//   res.on("close", () => {
//     transport.close();
//   });
//   await mcpServer.connect(transport);
//   await transport.handleRequest(req, res , req.body);
// })

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the MCP Server");
});

app.listen(4006, () => {
  console.log("MCP Server is running on http://localhost:4006/mcp");
});