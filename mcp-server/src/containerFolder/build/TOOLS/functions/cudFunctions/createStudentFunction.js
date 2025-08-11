import { connectMaster } from "../../../dbConnection/connect_master.js";
import createStudentFormatter from "../../formatters/cudFormatters/createStudentFormatter.js";
async function createStudentFunction(student) {
    try {
        const connectionMaster = await connectMaster();
        await connectionMaster.query(`INSERT INTO auth (name , uname , password , role) values (?,?,?,?)`, [student.name, student.uname, student.password, "student"]);
        const respone = createStudentFormatter(false, "", "Student added successfully");
        return respone;
    }
    catch (err) {
        const responeError = createStudentFormatter(true, err.message, "");
        return responeError;
    }
}
export default createStudentFunction;
