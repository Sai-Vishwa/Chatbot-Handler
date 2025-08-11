import z from "zod";
import createTeacherFunction from "../functions/cudFunctions/createTeacherFunction.js";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
const createTeacherTool = {
    name: "create_Teacher",
    description: "Creates a new Teacher in the system with the provided details",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the Teacher to be created"),
        name: z.string().describe("name of the Teacher to be created"),
        password: z.string().describe("password for the Teacher to be created")
    },
    handler: async ({ uname, name, password }) => {
        const Teacher = {
            uname: uname,
            name: name,
            password: password
        };
        const resp = await createTeacherFunction(Teacher);
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
export default createTeacherTool;
