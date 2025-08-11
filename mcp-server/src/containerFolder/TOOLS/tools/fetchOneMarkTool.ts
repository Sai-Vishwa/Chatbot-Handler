import z from "zod";
import fetchOneMarkFunction from "../functions/readFunctions/fetchOneMarkFunction.js";
import { fetch_One_Mark_Input_Format, Marks_Read_Response_Format } from "../formats/readFornat/marksReadFormat.js";
import MarksJsonToStringConverter from "../formatters/readConvertor/MarksJsonToStringConverter.js";
import { MCPTool } from "mcp-framework";

class fetchOneMarkTool extends MCPTool<fetch_One_Mark_Input_Format> {
  name: string = "fetch_One_Mark";
  description: string = "Returns marks of one student with their roll number as input";

  schema = {
    uname: {
      type: z.string(),
      description: "user name of the student whose marks is to be fetched"
    }
  };

  async execute(input : fetch_One_Mark_Input_Format){
    const resp : Marks_Read_Response_Format = await fetchOneMarkFunction(input.uname);

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

export default fetchOneMarkTool;