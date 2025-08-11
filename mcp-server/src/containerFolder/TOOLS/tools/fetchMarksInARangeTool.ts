import z from "zod";
import { fetch_Marks_In_A_Range_Input_Format, Marks_Read_Response_Format } from "../formats/readFornat/marksReadFormat.js";
import fetchMarksInARangeFunction from "../functions/readFunctions/fetchMarksInARangeFunction.js";
import MarksJsonToStringConverter from "../formatters/readConvertor/MarksJsonToStringConverter.js";
import { MCPTool } from "mcp-framework";

class fetchMarksInARangeTool extends MCPTool<fetch_Marks_In_A_Range_Input_Format> {
  name: string = "fetch_Marks_In_A_Range";
  description: string = "Returns marks of the students whose marks fall in the provided range";
  
  schema = {
    start: {
      type : z.number(),
      description: "Minimum starting mark",
      optional : true
    }, 
    end: {
      type : z.number(),
      description: "Maximum ending mark",
      optional : true
    }
  };

  async execute(input: fetch_Marks_In_A_Range_Input_Format) {
    const resp : Marks_Read_Response_Format = await fetchMarksInARangeFunction(input.start , input.end);

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


export default fetchMarksInARangeTool;