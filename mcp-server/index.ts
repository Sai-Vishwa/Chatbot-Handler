import express from "express";
import bodyParser from "body-parser";
// import { randomTextTool } from "./tools/randomText";

const app = express();
const port = 4005;

app.use(bodyParser.json());

// MCP Metadata Endpoint
app.get("/.well-known/ai-plugin.json", (_, res) => {
  res.json({
    schema_version: "v1",
    name: "My Simple MCP Server",
    tools: [
      {
        name: randomTextTool.name,
        description: randomTextTool.description,
        input_schema: randomTextTool.input_schema,
        output_schema: randomTextTool.output_schema
      }
    ]
  });
});

// Tool Invocation Endpoint
app.post("/invoke", async (req, res) => {
  const { tool_name, input } = req.body;

  if (tool_name === "randomText") {
    const output = await randomTextTool.invoke(input);
    return res.json({ output });
  }

  return res.status(400).json({ error: "Tool not found" });
});

app.listen(port, () => {
  console.log(`MCP server running at http://localhost:${port}`);
});
