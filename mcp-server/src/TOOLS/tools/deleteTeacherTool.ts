import z from "zod";
import { toolsFormat } from "../formats/toolsFormat/toolsFormat.js";
import cudResponseToStringConvertot from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import { deleteTeacherInputFormat, deleteTeacherResponseFormat } from "../formats/cudFormat/deleteTeacherFormat.js";
import deleteTeacherFunction from "../functions/cudFunctions/deleteTeacherFunction.js";

const deleteTeacherTool : toolsFormat = {
    name:   "delete_Teacher", 
    description:   "Deletes a new Teacher in the system with the provided user name",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the Teacher to be deleted"),
    },
    handler: async({uname}) => {
    const Teacher : deleteTeacherInputFormat = {
        uname: uname
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
      const formatted_resp : string  = cudResponseToStringConvertot(resp as deleteTeacherResponseFormat);

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