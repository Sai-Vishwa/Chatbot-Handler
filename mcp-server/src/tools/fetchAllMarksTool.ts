import z from "zod";
import { toolsFormat } from "../formats/toolsFormat/toolsFormat.js";
import { Marks_Read_Response_Format } from "../formats/readFornat/marksReadFormat.js";
import fetchAllMarksFunction from "../functions/readFunctions/fetchAllMarksFuction.js";
import MarksJsonToStringConverter from "../formatters/readConvertor/MarksJsonToStringConverter.js";

const fetchAllMarksTool : toolsFormat = {
    name:   "fetch_All_Marks", 
    description:   "Returns marks of all the students",
    paramsSchemaOrAnnotations: z.object({}).optional().describe("this is completely optional"),
    handler: async({}) => {
    const resp : Marks_Read_Response_Format = await fetchAllMarksFunction();

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

export default fetchAllMarksTool;