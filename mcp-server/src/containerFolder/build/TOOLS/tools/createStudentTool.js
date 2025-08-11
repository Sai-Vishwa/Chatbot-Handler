import z from "zod";
import createStudentFunction from "../functions/cudFunctions/createStudentFunction.js";
import cudResponseToStringConvertor from "../formatters/cudConvertor/cudResponseToStringConvertor.js";
const createStudentTool = {
    name: "create_Student",
    description: "Creates a new student in the system with the provided details - name as striing, uname as string, and password as string",
    paramsSchemaOrAnnotations: {
        uname: z.string().describe("user name of the student to be created"),
        name: z.string().describe("name of the student to be created"),
        password: z.string().describe("password for the student to be created")
    },
    handler: async ({ uname, name, password }) => {
        const student = {
            uname: uname,
            name: name,
            password: password
        };
        const resp = await createStudentFunction(student);
        if (resp.isErrorResponse) {
            console.error("Error in creating student:", resp.errorMessage);
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
export default createStudentTool;
