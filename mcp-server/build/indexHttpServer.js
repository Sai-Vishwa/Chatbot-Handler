import express from "express";
import cors from "cors";
import router from "./router/router.js";
// const mcpServer = new McpServer({
//   name: "Marks_table_server_2",
//   version: "1.0.0",
//   capabilities:{
//     resources:{},
//     tools:{}
//   }
// })  
// mcpServer.tool(
//   "fetch_All_Marks", 
//   "Returns marks of all the students",
//   {
//     i : z.object({}).optional().describe("this is completely optional")
//   },
//   async({i}) => {
//     const resp : Marks_Read_Response_Format = await fetchAllMarksFunction();
//     if(resp.isErrorResponse){
//       return {
//         content : [
//           {
//             type: "text",
//             text: typeof resp.errorMessage == "string" ? resp.errorMessage : "there is some error"
//           }
//         ]
//       }
//     }
//     else{
//       const formatted_resp : string  = MarksJsonToStringConverter(resp)
//       return {
//         content : [
//           {
//             type : "text",
//             text : formatted_resp
//           }
//         ]
//       }
//     }
//   }
// );
// mcpServer.tool(
//   "fetch_One_Mark", 
//   "Returns marks of one student with their roll number as input",
//   {
//   roll_no: z.number().describe("roll number of the student whose marks is to be fetched")
//   },
//   async({roll_no}) => {
//     const resp : Marks_Read_Response_Format = await fetchOneMarkFunction(roll_no);
//     if(resp.isErrorResponse){
//       return {
//         content : [
//           {
//             type: "text",
//             text: typeof resp.errorMessage == "string" ? resp.errorMessage : "there is some error"
//           }
//         ]
//       }
//     }
//     else{
//       const formatted_resp : string  = MarksJsonToStringConverter(resp)
//       return {
//         content : [
//           {
//             type : "text",
//             text : formatted_resp
//           }
//         ]
//       }
//     }
//   }
// );
// mcpServer.tool(
//   "fetch_Marks_In_A_Range", 
//   "Returns marks of the students whose marks fall in the provided range",
//   {
//     start: z.number().describe("minimum starting mark").optional(),
//     end:   z.number().describe("maximum ending mark").optional()
//   },
//   async({start , end}) => {
//     const resp : Marks_Read_Response_Format = await fetchMarksInARangeFunction(start , end);
//     if(resp.isErrorResponse){
//       return {
//         content : [
//           {
//             type: "text",
//             text: typeof resp.errorMessage == "string" ? resp.errorMessage : "there is some error"
//           }
//         ]
//       }
//     }
//     else{
//       const formatted_resp : string  = MarksJsonToStringConverter(resp)
//       return {
//         content : [
//           {
//             type : "text",
//             text : formatted_resp
//           }
//         ]
//       }
//     }
//   }
// );
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
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
app.get("/", (req, res) => {
    res.send("Welcome to the MCP Server");
});
app.listen(4006, () => {
    console.log("MCP Server is running on http://localhost:4006/mcp");
});
