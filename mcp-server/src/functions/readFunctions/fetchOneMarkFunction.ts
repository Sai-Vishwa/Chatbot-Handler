import { isErrored } from "stream";
import { connectSlave } from "../../dbConnection/connector_slave.js";
import  { Marks_Read_Response_Format,Mark } from "../../formats/readFornat/marksReadFormat.js";
import fetchMarksInARangeFormatter from "../../formatters/readFormatters/fetchMarksInARangeFormatter.js";
import { fetchOneMarkFormatter } from "../../formatters/readFormatters/fetchOneMarkFormatter.js";

async function fetchOneMarkFunction<T>(roll_no : any): Promise<Marks_Read_Response_Format> {

  try {
      const connectionSlave = await connectSlave();

      if(typeof roll_no != 'number') {
        const resp : Marks_Read_Response_Format = fetchOneMarkFormatter(true , "The required input type is a number" , []);
        return resp as Marks_Read_Response_Format;
      }

      const [results] = await connectionSlave.query(`SELECT * FROM marks where rno = ?`,[roll_no]);

      const respone : Marks_Read_Response_Format = fetchMarksInARangeFormatter(false , "" , results as Mark[]);
      
      return respone;

    } 
    catch (err: any) {
      const responeError : Marks_Read_Response_Format = fetchMarksInARangeFormatter(true , err , []);

      return responeError;
    }
}
export default fetchOneMarkFunction