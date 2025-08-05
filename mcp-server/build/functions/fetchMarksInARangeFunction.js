import { connectSlave } from "../dbConnection/connector_slave.js";
import fetchMarksInARangeFormatter from "../formatters/fetchMarksInARangeFormatter.js";
async function fetchMarksInARangeFunction(start, end) {
    try {
        const connectionSlave = await connectSlave();
        if ((typeof start != "number" || start != null) && (typeof end != "number" || end != null)) {
            const resp = fetchMarksInARangeFormatter(true, "The required input type of start and end are number and inclusive is a boolean", []);
            return resp;
        }
        if (start == null) {
            start = 0;
        }
        if (end == null) {
            end = 200;
        }
        const [results] = await connectionSlave.query(`SELECT * FROM marks where marks >= ? and marks <= ?`, [start, end]);
        const respone = fetchMarksInARangeFormatter(false, "", results);
        return respone;
    }
    catch (err) {
        const responeError = fetchMarksInARangeFormatter(true, err, []);
        return responeError;
    }
}
export default fetchMarksInARangeFunction;
