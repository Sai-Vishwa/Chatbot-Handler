import z from "zod";
import { toolsFormat } from "../formats/toolsFormat/toolsFormat.js";
import { Marks_Read_Response_Format } from "../formats/readFornat/marksReadFormat.js";
import fetchAllMarksFunction from "../functions/readFunctions/fetchAllMarksFuction.js";
import MarksJsonToStringConverter from "../formatters/readConvertor/MarksJsonToStringConverter.js";
import { MCPTool } from "mcp-framework";


class fetchAllMarksTool extends MCPTool<{}> {
  name: string = "fetch_All_Marks";
  description: string = "Returns marks of all the students";
  schema = {};
  async execute(){
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
}

export default fetchAllMarksTool;