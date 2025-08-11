import z from "zod";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import updateMarksFunction from "../functions/cudFunctions/updateMarksFunction.js";
const updateMarksTool = {
    name: "update_Marks",
    description: "Updates the marks of a student in the system with the provided uname",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the student whose marks are to be updated"),
        marks: z.number().describe("new marks to be updated for the student"),
    },
    handler: async ({ uname, marks }) => {
        const mark = {
            uname: uname,
            marks: marks
        };
        const resp = await updateMarksFunction(mark);
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
            const formatted_resp = cudResponseToStringConvertor(resp);
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
export default updateMarksTool;
