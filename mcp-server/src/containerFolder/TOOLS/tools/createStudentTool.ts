import z from "zod";
import { createStudentInputFormat, createStudentResponseFormat } from "../formats/cudFormat/createStudentFormat.js";
import createStudentFunction from "../functions/cudFunctions/createStudentFunction.js";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import { MCPTool } from "mcp-framework";


class createStudentTool extends MCPTool<createStudentInputFormat> {
  name: string = "create_Student";
  description: string = "Creates a new student in the system with the provided details - name as striing, uname as string, and password as string";

  schema = {
    uname : {
      type: z.string(),
      description: "User name of the student to be created"
    },
    name: {
      type: z.string(),
      description: "Name of the student to be created"
    },
    password: {
      type: z.string(), 
      description: "Password for the student to be created"
    }
  };

  async execute(input : createStudentInputFormat){
    const student : createStudentInputFormat = {
        uname: input.uname,
        name: input.name,
        password: input.password
    }
    const resp : createStudentResponseFormat = await createStudentFunction(student as createStudentInputFormat);

    if(resp.isErrorResponse){
      console.error("Error in creating student:", resp.errorMessage);
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
      const formatted_resp : string  = cudResponseToStringConvertor(resp as createStudentResponseFormat);

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

export default createStudentTool;