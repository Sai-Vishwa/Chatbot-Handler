import { connectMaster } from "../../../dbConnection/connect_master.js";
import deleteStudentFormatter from "../../formatters/cudFormatters/deleteStudentFormatter.js";
async function deleteStudentFunction(student) {
    try {
        const connectionMaster = await connectMaster();
        await connectionMaster.query(`DELETE FROM auth WHERE uname = ? `, [student.uname]);
        const respone = deleteStudentFormatter(false, "", "Student deleted successfully");
        return respone;
    }
    catch (err) {
        const responeError = deleteStudentFormatter(true, err.message, "");
        return responeError;
    }
}
export default deleteStudentFunction;
