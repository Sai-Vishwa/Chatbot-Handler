import z from "zod";
import { toolsFormat } from "../formats/toolsFormat/toolsFormat.js";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import { deleteStudentInputFormat, deleteStudentResponseFormat } from "../formats/cudFormat/deleteStudentFormat.js";
import deleteStudentFunction from "../functions/cudFunctions/deleteStudentFunction.js";

const deleteStudentTool : toolsFormat = {
    name:   "delete_Student", 
    description:   "Deletes a new student in the system with the provided user name",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the student to be deleted"),
    },
    handler: async({uname}) => {
    const student : deleteStudentInputFormat = {
        uname: uname
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