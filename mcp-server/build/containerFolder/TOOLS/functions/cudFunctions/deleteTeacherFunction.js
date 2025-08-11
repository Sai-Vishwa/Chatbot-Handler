import { connectMaster } from "../../../dbConnection/connect_master.js";
import deleteTeacherFormatter from "../../formatters/cudFormatters/deleteTeacherFormatter.js";
async function deleteTeacherFunction(Teacher) {
    try {
        const connectionMaster = await connectMaster();
        await connectionMaster.query(`DELETE FROM auth WHERE uname = ? `, [Teacher.uname]);
        const respone = deleteTeacherFormatter(false, "", "Teacher deleted successfully");
        return respone;
    }
    catch (err) {
        const responeError = deleteTeacherFormatter(true, err.message, "");
        return responeError;
    }
}
export default deleteTeacherFunction;
