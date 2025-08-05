import { connectSlave } from "../dbConnection/connector_slave.js";
import  { Marks_Response_Format,Mark } from "../formats/marksFormat.js";
import fetchMarksInARangeFormatter from "../formatters/fetchMarksInARangeFormatter.js";

async function fetchMarksInARangeFunction<T>(start: any, end: any): Promise<Marks_Response_Format> {

  try {
      const connectionSlave = await connectSlave();

      if((typeof start != "number" || start != null) && (typeof end != "number" || end != null)){
        const resp : Marks_Response_Format = fetchMarksInARangeFormatter(true , "The required input type of start and end are number and inclusive is a boolean" , []);
        return resp;
      }

      if(start == null){
        start = 0 ;
      }

      if(end == null){
        end = 200;
      }

     

      const [results] = await connectionSlave.query(`SELECT * FROM marks where marks >= ? and marks <= ?`,[start,end]);


      const respone : Marks_Response_Format = fetchMarksInARangeFormatter(false , "" , results as Mark[]);
      
      return respone;

    } 
    catch (err: any) {
      const responeError : Marks_Response_Format = fetchMarksInARangeFormatter(true , err , []);

      return responeError;
    }
}

export default fetchMarksInARangeFunction