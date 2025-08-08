import z from "zod";
import { toolsFormat } from "../formats/toolsFormat/toolsFormat.js";
import { createStudentInputFormat, createStudentResponseFormat } from "../formats/cudFormat/createStudentFormat.js";
import createStudentFunction from "../functions/cudFunctions/createStudentFunction.js";
import cudResponseToStringConvertot from "../formatters/cudConvertor/cudResponseToStringConvertor.js";

const createStudentTool : toolsFormat = {
    name:   "create_Student", 
    description:   "Creates a new student in the system with the provided details",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the student to be created"),
        name: z.string().describe("name of the student to be created"),
        password: z.string().describe("password for the student to be created")
    },
    handler: async({uname , name , password}) => {
    const student : createStudentInputFormat = {
        uname: uname,
        name: name,
        password: password
    }
    const resp : createStudentResponseFormat = await createStudentFunction(student as createStudentInputFormat);

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
      const formatted_resp : string  = cudResponseToStringConvertot(resp as createStudentResponseFormat);

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