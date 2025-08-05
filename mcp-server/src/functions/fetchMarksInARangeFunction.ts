import { connectSlave } from "../../dbConnection/connector_slave";
import  { Marks_Response_Format,Mark } from "../formats/marksFormat";
import fetchMarksInARangeFormatter from "../formatters/fetchMarksInARangeFormatter";

async function fetchMarksInARange<T>(start: number | null, end: number | null , inclusive: boolean | null): Promise<T | null> {

  try {
      const connectionSlave = await connectSlave();

      let equal = "";

      if(start == null){
        start = 0 ;
      }

      if(end == null){
        end = 200;
      }

      if(inclusive == true){
        equal = "="
      }

      const [results] = await connectionSlave.query(`SELECT * FROM marks where marks >? ? and marks <? ?`,[equal , start , equal , end]);


      const respone : Marks_Response_Format = fetchMarksInARangeFormatter(false , "" , results as Mark[]);
      
      return respone as T;

    } 
    catch (err: any) {
      const responeError : Marks_Response_Format = fetchMarksInARangeFormatter(true , err , []);

      return responeError as T;
    }
}

module.exports = {
    fetchMarksInARange
}