import z from "zod";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import { deleteStudentInputFormat, deleteStudentResponseFormat } from "../formats/cudFormat/deleteStudentFormat.js";
import deleteStudentFunction from "../functions/cudFunctions/deleteStudentFunction.js";
import { MCPTool } from "mcp-framework";

class deleteStudentTool extends MCPTool<deleteStudentInputFormat> {
  name: string = "delete_Student";
  description: string = "Deletes a student in the system with the provided user name";
  schema = {
    uname: {
      type: z.string(),
      description: "User name of the student to be deleted" 
    }
  };

  async execute(input: deleteStudentInputFormat){
    const student : deleteStudentInputFormat = {
        uname: input.uname
    }
    const resp : deleteStudentResponseFormat = await deleteStudentFunction(student as deleteStudentInputFormat);

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
      const formatted_resp : string  = cudResponseToStringConvertor(resp as deleteStudentResponseFormat);

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


export default deleteStudentTool;