import { connectSlave } from "../../../dbConnection/connect_slave.js";
import fetchMarksInARangeFormatter from "../../formatters/readFormatters/fetchMarksInARangeFormatter.js";
import { fetchOneMarkFormatter } from "../../formatters/readFormatters/fetchOneMarkFormatter.js";
async function fetchOneMarkFunction(roll_no) {
    try {
        const connectionSlave = await connectSlave();
        if (typeof roll_no != 'number') {
            const resp = fetchOneMarkFormatter(true, "The required input type is a number", []);
            return resp;
        }
        const [results] = await connectionSlave.query(`SELECT m.marks , m.uname , a.name FROM marks m auth a where uname = ? and a.uname=m.uname`, [roll_no]);
        const respone = fetchMarksInARangeFormatter(false, "", results);
        return respone;
    }
    catch (err) {
        const responeError = fetchMarksInARangeFormatter(true, err, []);
        return responeError;
    }
}
export default fetchOneMarkFunction;
