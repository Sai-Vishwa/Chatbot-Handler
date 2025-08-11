import z from "zod";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import { deleteTeacherInputFormat, deleteTeacherResponseFormat } from "../formats/cudFormat/deleteTeacherFormat.js";
import deleteTeacherFunction from "../functions/cudFunctions/deleteTeacherFunction.js";
import { MCPTool } from "mcp-framework";

class deleteTeacherTool extends MCPTool<deleteTeacherInputFormat> {
  name: string = "delete_Teacher";
  description: string = "Deletes a new Teacher in the system with the provided user name";  
  schema = {
    uname: {
      type: z.string(),
      description: "User name of the Teacher to be deleted"
    }
  };
  async execute(input: deleteTeacherInputFormat){
    const Teacher : deleteTeacherInputFormat = {
        uname: input.uname
    }
    const resp : deleteTeacherResponseFormat = await deleteTeacherFunction(Teacher as deleteTeacherInputFormat);

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
      const formatted_resp : string  = cudResponseToStringConvertor(resp as deleteTeacherResponseFormat);

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

export default deleteTeacherTool;