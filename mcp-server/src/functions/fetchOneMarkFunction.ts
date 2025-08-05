import { connectSlave } from "../../dbConnection/connector_slave";

async function fetchOneMark<T>(roll_no : string): Promise<T | null> {

  try {
      const connectionSlave = await connectSlave();

      console.log("This is the input i recieved - > ",roll_no)

      const [results] = await connectionSlave.query(`SELECT * FROM marks where rno=${roll_no}`);

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
    fetchOneMark
}