import { connectSlave } from "../../../dbConnection/connect_slave.js";
import fetchMarksInARangeFormatter from "../../formatters/readFormatters/fetchMarksInARangeFormatter.js";
async function fetchAllMarksFunction() {
    try {
        const connectionSlave = await connectSlave();
        const [results] = await connectionSlave.query(`SELECT m.uname , m.marks , a.name FROM marks m , auth a WHERE m.uname = a.uname`);
        const respone = fetchMarksInARangeFormatter(false, "", results);
        return respone;
    }
    catch (err) {
        const responeError = fetchMarksInARangeFormatter(true, err, []);
        return responeError;
    }
}
export default fetchAllMarksFunction;
