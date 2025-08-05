import { connectSlave } from "../dbConnection/connector_slave.js";
import fetchMarksInARangeFormatter from "../formatters/fetchMarksInARangeFormatter.js";
async function fetchAllMarksFunction() {
    try {
        const connectionSlave = await connectSlave();
        const [results] = await connectionSlave.query(`SELECT * FROM marks`);
        const respone = fetchMarksInARangeFormatter(false, "", results);
        return respone;
    }
    catch (err) {
        const responeError = fetchMarksInARangeFormatter(true, err, []);
        return responeError;
    }
}
export default fetchAllMarksFunction;
