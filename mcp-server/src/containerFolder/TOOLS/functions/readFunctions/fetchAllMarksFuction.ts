import { connectSlave } from "../../../dbConnection/connect_slave.js";
import  { Marks_Read_Response_Format,Mark } from "../../formats/readFornat/marksReadFormat.js";
import fetchMarksInARangeFormatter from "../../formatters/readFormatters/fetchMarksInARangeFormatter.js";

async function fetchAllMarksFunction<T>(): Promise<Marks_Read_Response_Format>{

  try {
      const connectionSlave = await connectSlave();

      const [results] = await connectionSlave.query(`SELECT m.uname , m.marks , a.name FROM marks m , auth a WHERE m.uname = a.uname`);


      const respone : Marks_Read_Response_Format = fetchMarksInARangeFormatter(false , "" , results as Mark[]);
      
      return respone as Marks_Read_Response_Format;

    } 
    catch (err: any) {
      const responeError : Marks_Read_Response_Format = fetchMarksInARangeFormatter(true , err , []);

      return responeError as Marks_Read_Response_Format;
    }
}
export default fetchAllMarksFunction;