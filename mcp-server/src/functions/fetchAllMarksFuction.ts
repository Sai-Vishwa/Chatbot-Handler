import { connectSlave } from "../dbConnection/connector_slave.js";
import  { Marks_Response_Format,Mark } from "../formats/marksFormat.js";
import fetchMarksInARangeFormatter from "../formatters/fetchMarksInARangeFormatter.js";

async function fetchAllMarksFunction<T>(): Promise<Marks_Response_Format>{

  try {
      const connectionSlave = await connectSlave();

      const [results] = await connectionSlave.query(`SELECT * FROM marks`);


      const respone : Marks_Response_Format = fetchMarksInARangeFormatter(false , "" , results as Mark[]);
      
      return respone as Marks_Response_Format;

    } 
    catch (err: any) {
      const responeError : Marks_Response_Format = fetchMarksInARangeFormatter(true , err , []);

      return responeError as Marks_Response_Format;
    }
}
export default fetchAllMarksFunction;