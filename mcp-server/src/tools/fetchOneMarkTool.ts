import z from "zod";
import { toolsFormat } from "../formats/toolsFormat/toolsFormat.js";
import fetchOneMarkFunction from "../functions/readFunctions/fetchOneMarkFunction.js";
import { Marks_Read_Response_Format } from "../formats/readFornat/marksReadFormat.js";
import MarksJsonToStringConverter from "../formatters/readConvertor/MarksJsonToStringConverter.js";

const fetchOneMarkTool : toolsFormat = {
    name:   "fetch_One_Mark", 
    description:   "Returns marks of one student with their roll number as input",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the student whose marks is to be fetched")
    },
    handler: async({uname}) => {
    const resp : Marks_Read_Response_Format = await fetchOneMarkFunction(uname);

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