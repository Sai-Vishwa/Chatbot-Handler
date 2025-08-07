import express from "express";
import bodyParser, { json } from "body-parser";

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { version } from "os";
// import router from "./router/router.js";
import fetchAllMarksFunction from "./functions/readFunctions/fetchAllMarksFuction.js";
import { Marks_Read_Response_Format } from "./formats/readFornat/marksReadFormat.js";
import MarksJsonToStringConverter from "./formatters/readConvertor/MarksJsonToStringConverter.js";
import fetchOneMarkFunction from "./functions/readFunctions/fetchOneMarkFunction.js";
import fetchMarksInARangeFormatter from "./formatters/readFormatters/fetchMarksInARangeFormatter.js";
import fetchMarksInARangeFunction from "./functions/readFunctions/fetchMarksInARangeFunction.js";
// import { connectSlave } from "./dbConnection/connector_slave";


const mcpServer = new McpServer({
  name: "Marks_table_server",
  version: "1.0.0",
  capabilities:{
    resources:{},
    tools:{}
  }
})  

mcpServer.tool(
  "fetch_All_Marks", 
  "Returns marks of all the students",
  {
    i : z.object({}).optional().describe("this is completely optional")
  },
  async({i}) => {
    const resp : Marks_Read_Response_Format = await fetchAllMarksFunction();

    if(resp.isErrorResponse){
      return {
        content : [
          {
            type: "text",
            text: typeof resp.errorMessage == "string" ? resp.errorMessage : "there is some error"
          }
        ]
      }
    }
    else{
      const formatted_resp : string  = MarksJsonToStringConverter(resp)

      return {
        content : [
          {
            type : "text",
            text : formatted_resp
          }
        ]
      }
    }
  }
);


mcpServer.tool(
  "fetch_One_Mark", 
  "Returns marks of one student with their roll number as input",
  {
  roll_no: z.number().describe("roll number of the student whose marks is to be fetched")
  },
  async({roll_no}) => {
    const resp : Marks_Read_Response_Format = await fetchOneMarkFunction(roll_no);

    if(resp.isErrorResponse){
      return {
        content : [
          {
            type: "text",
            text: typeof resp.errorMessage == "string" ? resp.errorMessage : "there is some error"
          }
        ]
      }
    }
    else{
      const formatted_resp : string  = MarksJsonToStringConverter(resp)

      return {
        content : [
          {
            type : "text",
            text : formatted_resp
          }
        ]
      }
    }
  }
);


mcpServer.tool(
  "fetch_Marks_In_A_Range", 
  "Returns marks of the students whose marks fall in the provided range",
  {
    start: z.number().describe("minimum starting mark").optional(),
    end:   z.number().describe("maximum ending mark").optional()
  },
  async({start , end}) => {
    const resp : Marks_Read_Response_Format = await fetchMarksInARangeFunction(start , end);

    if(resp.isErrorResponse){
      return {
        content : [
          {
            type: "text",
            text: typeof resp.errorMessage == "string" ? resp.errorMessage : "there is some error"
          }
        ]
      }
    }
    else{
      const formatted_resp : string  = MarksJsonToStringConverter(resp)

      return {
        content : [
          {
            type : "text",
            text : formatted_resp
          }
        ]
      }
    }
  }
);


async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});