import z from "zod";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
import deleteTeacherFunction from "../functions/cudFunctions/deleteTeacherFunction.js";
const deleteTeacherTool = {
    name: "delete_Teacher",
    description: "Deletes a new Teacher in the system with the provided user name",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the Teacher to be deleted"),
    },
    handler: async ({ uname }) => {
        const Teacher = {
            uname: uname
        };
        const resp = await deleteTeacherFunction(Teacher);
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
export default deleteTeacherTool;
