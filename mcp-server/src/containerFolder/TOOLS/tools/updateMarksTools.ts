import z from "zod";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import { updateMarksInputFormat, updateMarksResponseFormat } from "../formats/cudFormat/updateMarksFormat.js";
import updateMarksFunction from "../functions/cudFunctions/updateMarksFunction.js";
import { MCPTool } from "mcp-framework";

class updateMarksTool extends MCPTool<updateMarksInputFormat> {
  name: string = "update_Marks";
  description: string = "Updates the marks of a student in the system with the provided uname";
  
  schema = {
    uname: {
      type: z.string(),
      description: "user name of the student whose marks are to be updated"
    },
    marks: {
      type: z.number(),
      description: "new marks to be updated for the student"
    }
  };
async execute(input: updateMarksInputFormat){
    const mark : updateMarksInputFormat = {
        uname: input.uname,
        marks: input.marks
    }
    const resp : updateMarksResponseFormat = await updateMarksFunction(mark as updateMarksInputFormat);

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
      const formatted_resp : string  = cudResponseToStringConvertor(resp as updateMarksResponseFormat);

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

export default updateMarksTool;