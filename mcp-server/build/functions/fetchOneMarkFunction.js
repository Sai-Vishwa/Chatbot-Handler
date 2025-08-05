import { connectSlave } from "../dbConnection/connector_slave.js";
import fetchMarksInARangeFormatter from "../formatters/fetchMarksInARangeFormatter.js";
import { fetchOneMarkFormatter } from "../formatters/fetchOneMarkFormatter.js";
async function fetchOneMarkFunction(roll_no) {
    try {
        const connectionSlave = await connectSlave();
        if (typeof roll_no != 'number') {
            const resp = fetchOneMarkFormatter(true, "The required input type is a number", []);
            return resp;
        }
        const [results] = await connectionSlave.query(`SELECT * FROM marks where rno = ?`, [roll_no]);
        const respone = fetchMarksInARangeFormatter(false, "", results);
        return respone;
    }
    catch (err) {
        const responeError = fetchMarksInARangeFormatter(true, err, []);
        return responeError;
    }
}
export default fetchOneMarkFunction;
