import fetchAllMarksFunction from "../functions/readFunctions/fetchAllMarksFuction.js";
import MarksJsonToStringConverter from "../formatters/readConvertor/MarksJsonToStringConverter.js";
const fetchAllMarksTool = {
    name: "fetch_All_Marks",
    description: "Returns marks of all the students",
    paramsSchemaOrAnnotations: {},
    handler: async () => {
        const resp = await fetchAllMarksFunction();
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
export default fetchAllMarksTool;
