import z from "zod";
import fetchOneMarkFunction from "../functions/readFunctions/fetchOneMarkFunction.js";
import MarksJsonToStringConverter from "../formatters/readConvertor/MarksJsonToStringConverter.js";
const fetchOneMarkTool = {
    name: "fetch_One_Mark",
    description: "Returns marks of one student with their roll number as input",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the student whose marks is to be fetched")
    },
    handler: async ({ uname }) => {
        const resp = await fetchOneMarkFunction(uname);
        if (resp.isErrorResponse) {
            return {
                content: [
                    {
                        type: "text",
                        text: typeof resp.errorMessage == "string" ? resp.errorMessage : "there is some error"
                    }
                ]
            };
        }
        else {
            const formatted_resp = MarksJsonToStringConverter(resp);
            return {
                content: [
                    {
                        type: "text",
                        text: formatted_resp
                    }
                ]
            };
        }
    }
};
export default fetchOneMarkTool;
