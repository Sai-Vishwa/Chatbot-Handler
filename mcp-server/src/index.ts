import express from "express";
import bodyParser from "body-parser";
import router from "./router/router";

// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { version } from "os";
// import { connectSlave } from "./dbConnection/connector_slave";


// const mcpServer = new McpServer({
//   name: "Marks table server",
//   version: "1.0.0",
//   capabilities:{
//     resources:{},
//     tools:{}
//   }
// })

// mcpServer.tool(
//   "fetchAllMarks",
//   "Returns marks of all the students",
//   {}, // No input schema for now
//   async () => {
//     try {
//       const connectionSlave = await connectSlave();
      
//       const [results]  = await connectionSlave.query("SELECT * FROM marks") as [any[],any];

//       if (!results || (Array.isArray(results) && results.length === 0)) {
//         return {
//           content: [
//             {
//               type: "text",
//               text: "No student records found.",
//             },
//           ],
//         };
//       }

//       // Format result
//       const formatted = results.map((student: any) =>
//         `Roll No: ${student.roll_no}\nName: ${student.name}\nMarks: ${student.marks}\n---`
//       );

//       return {
//         content: [
//           {
//             type: "text",
//             text: `All student marks:\n\n${formatted.join("\n")}`,
//           },
//         ],
//       };
//     } catch (err: any) {
//       return {
//         content: [
//           {
//             type: "text",
//             text: `Error fetching marks: ${err.message}`,
//           },
//         ],
//       };
//     }
//   }
// );

// async function main() {
//   const transport = new StdioServerTransport();
//   await mcpServer.connect(transport);
//   console.error("Weather MCP Server running on stdio");
// }

// main().catch((error) => {
//   console.error("Fatal error in main():", error);
//   process.exit(1);
// });


const app = express();
const port = 4005;

app.use(bodyParser.json());

app.use("/",router)

app.listen(port, () => {
  console.log(`MCP server running at http://localhost:${port}`);
});
