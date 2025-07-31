import express from "express";
import { fetchAllMarks } from "../tools/fetchAllMarks";
import { fetchOneMark } from "../tools/fetchOneMark";

const router = express.Router();



router.get("/all_tools", (_, res) => {
  res.json({
    schema_version: "v1",
    name: "Marks MCP Server",
    tools: [
      {
        name: fetchAllMarks.name,
        description: fetchAllMarks.description,
        input_schema: fetchAllMarks.input_schema,
        output_schema: fetchAllMarks.output_schema
      },
      {
        name: fetchOneMark.name,
        description: fetchOneMark.description,
        input_schema: fetchOneMark.input_schema,
        output_schema: fetchOneMark.output_schema
      }
    ]
  });
});


router.post("/invoke", async (req, res) => {
  const { tool_name, input } = req.body;

  if (tool_name === "fetchAllMarks") {
    const output = await fetchAllMarks.invoke(input);
    return res.json({ output });
  }

  else if (tool_name === "fetchOneMark") {
    const output = await fetchOneMark.invoke(input);
    return res.json({ output });
  }

  return res.status(400).json({ error: "Tool not found" });
});

export default router;