import { isErrored } from "stream";
import { connectSlave } from "../dbConnection/connector_slave.js";
import  { Marks_Response_Format,Mark } from "../formats/marksFormat.js";
import fetchMarksInARangeFormatter from "../formatters/fetchMarksInARangeFormatter.js";
import { fetchOneMarkFormatter } from "../formatters/fetchOneMarkFormatter.js";

async function fetchOneMarkFunction<T>(roll_no : any): Promise<Marks_Response_Format> {

  try {
      const connectionSlave = await connectSlave();

      if(typeof roll_no != 'number') {
        const resp : Marks_Response_Format = fetchOneMarkFormatter(true , "The required input type is a number" , []);
        return resp as Marks_Response_Format;
      }

      const [results] = await connectionSlave.query(`SELECT * FROM marks where rno = ?`,[roll_no]);

      const respone : Marks_Response_Format = fetchMarksInARangeFormatter(false , "" , results as Mark[]);
      
      return respone;

    } 
    catch (err: any) {
      const responeError : Marks_Response_Format = fetchMarksInARangeFormatter(true , err , []);

      return responeError;
    }
}
export default fetchOneMarkFunction