import { connectSlave } from "../../../../dbConnection/connector_slave.js";
import  { Marks_Read_Response_Format,Mark } from "../../formats/readFornat/marksReadFormat.js";
import fetchMarksInARangeFormatter from "../../formatters/readFormatters/fetchMarksInARangeFormatter.js";

async function fetchMarksInARangeFunction<T>(start: any, end: any): Promise<Marks_Read_Response_Format> {

  try {
      const connectionSlave = await connectSlave();

      if((typeof start != "number" || start != null) && (typeof end != "number" || end != null)){
        const resp : Marks_Read_Response_Format = fetchMarksInARangeFormatter(true , "The required input type of start and end are number and inclusive is a boolean" , []);
        return resp;
      }

      if(start == null){
        start = 0 ;
      }

      if(end == null){
        end = 200;
      }

     

      const [results] = await connectionSlave.query(`SELECT m.uname , m.marks , a.name FROM marks m , auth a where marks >= ? and marks <= ? and m.uname = a.uname`,[start,end]);


      const respone : Marks_Read_Response_Format = fetchMarksInARangeFormatter(false , "" , results as Mark[]);
      
      return respone;

    } 
    catch (err: any) {
      const responeError : Marks_Read_Response_Format = fetchMarksInARangeFormatter(true , err , []);

      return responeError;
    }
}

export default fetchMarksInARangeFunction