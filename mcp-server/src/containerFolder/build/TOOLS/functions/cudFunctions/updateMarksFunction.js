import { connectMaster } from "../../../dbConnection/connect_master.js";
import updateMarksFormatter from "../../formatters/cudFormatters/updateMarksFormatter.js";
async function updateMarksFunction(mark) {
    try {
        const connectionMaster = await connectMaster();
        await connectionMaster.query(`INSERT INTO marks (uname , marks) VALUES (? , ?) ON DUPLICATE KEY UPDATE marks = VALUES(marks)`, [mark.uname, mark.marks]);
        const respone = updateMarksFormatter(false, "", "Marks updated successfully");
        return respone;
    }
    catch (err) {
        const responeError = updateMarksFormatter(true, err.message, "");
        return responeError;
    }
}
export default updateMarksFunction;
