import z from "zod";
import { toolsFormat } from "../formats/toolsFormat/toolsFormat.js";

const createStudentTool : toolsFormat = {
    name: "create_student",
    description: "Creates a new student in the system",
    paramsSchemaOrAnnotations : {
        name : z.string().describe("Name of the student"),
        uname : z.string().describe("Username of the student"),
        password : z.string().describe("Password for the student account"),
        role : z.string().describe("Role of the student, e.g., 'student'")
    },
    handler: async ({ i }) => {
        console.log(i as any);
    }
}