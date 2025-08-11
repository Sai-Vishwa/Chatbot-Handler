import z from "zod";
import { createTeacherInputFormat, createTeacherResponseFormat } from "../formats/cudFormat/createTeacherFormat.js";
import createTeacherFunction from "../functions/cudFunctions/createTeacherFunction.js";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import { MCPTool } from "mcp-framework";

class createTeacherTool extends MCPTool<createTeacherInputFormat> {
  name: string = "create_Teacher";
  description: string = "Creates a new Teacher in the system with the provided details";

  schema = {
    uname: {
      type: z.string(),
      description: "User name of the Teacher to be created"
    },
    name: {
      type: z.string(),
      description: "Name of the Teacher to be created"
    },
    password: {
      type: z.string(),
      description: "Password for the Teacher to be created"
    }
  };

  async execute(input : createTeacherInputFormat){
    const Teacher : createTeacherInputFormat = {
        uname: input.uname,
        name: input.name,
        password: input.password
    }
    const resp : createTeacherResponseFormat = await createTeacherFunction(Teacher as createTeacherInputFormat);

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
      const formatted_resp : string  = cudResponseToStringConvertor(resp as createTeacherResponseFormat);

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


export default createTeacherTool;