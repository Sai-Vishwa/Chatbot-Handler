import { connectMaster } from "../../../dbConnection/connect_master.js";
import createTeacherFormatter from "../../formatters/cudFormatters/createTeacherFormatter.js";
async function createTeacherFunction(teacher) {
    try {
        const connectionMaster = await connectMaster();
        await connectionMaster.query(`INSERT INTO AUTH(name , uname , password , role) values (?,?,?,?)`, [teacher.name, teacher.uname, teacher.password, "teacher"]);
        const respone = createTeacherFormatter(false, "", "Student added successfully");
        return respone;
    }
    catch (err) {
        const responeError = createTeacherFormatter(true, err.message, "");
        return responeError;
    }
}
export default createTeacherFunction;
