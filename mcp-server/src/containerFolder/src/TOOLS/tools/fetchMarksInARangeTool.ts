import z from "zod";
import { toolsFormat } from "../formats/toolsFormat/toolsFormat.js";
import { Marks_Read_Response_Format } from "../formats/readFornat/marksReadFormat.js";
import fetchMarksInARangeFunction from "../functions/readFunctions/fetchMarksInARangeFunction.js";
import MarksJsonToStringConverter from "../formatters/readConvertor/MarksJsonToStringConverter.js";

const fetchMarksInARangeTool : toolsFormat = {
    name:   "fetch_Marks_In_A_Range",
    description:   "Returns marks of the students whose marks fall in the provided range",
    paramsSchemaOrAnnotations: {
        start: z.number().describe("minimum starting mark").optional(),
        end:   z.number().describe("maximum ending mark").optional()
    },
    handler:async({start , end}) => {
    const resp : Marks_Read_Response_Format = await fetchMarksInARangeFunction(start , end);

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

export default fetchMarksInARangeTool;