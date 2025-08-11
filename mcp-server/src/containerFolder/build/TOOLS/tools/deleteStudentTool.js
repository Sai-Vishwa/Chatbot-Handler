import z from "zod";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import deleteStudentFunction from "../functions/cudFunctions/deleteStudentFunction.js";
const deleteStudentTool = {
    name: "delete_Student",
    description: "Deletes a new student in the system with the provided user name",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the student to be deleted"),
    },
    handler: async ({ uname }) => {
        const student = {
            uname: uname
        };
        const resp = await deleteStudentFunction(student);
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
export default deleteStudentTool;
