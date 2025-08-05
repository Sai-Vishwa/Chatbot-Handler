import { connectSlave } from "../../dbConnection/connector_slave";

async function fetchAllMarks<T>(): Promise<T | null> {

  try {
      const connectionSlave = await connectSlave();

      const [results] = await connectionSlave.query(`SELECT * FROM marks`);

      console.log(results);

      if (!results || (Array.isArray(results) && results.length === 0)) {
        return { error: "No records found" } as T;
      }

      return results as T;  
    } catch (err: any) {
      return { error: err.message }as T;
    }
}

module.exports = {
    fetchAllMarks
}