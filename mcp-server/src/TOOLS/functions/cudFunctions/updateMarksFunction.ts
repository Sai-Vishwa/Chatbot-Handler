import { connectMaster } from "../../../dbConnection/connector_master.js";
import { updateMarksInputFormat, updateMarksResponseFormat } from "../../formats/cudFormat/updateMarksFormat.js";
import updateMarksFormatter from "../../formatters/cudFormatters/updateMarksFormatter.js";

async function updateMarksFunction<T>(mark : updateMarksInputFormat): Promise<updateMarksResponseFormat>{

  try {
      const connectionMaster = await connectMaster();

      await connectionMaster.query(`INSERT INTO marks (uname , marks) VALUES (? , ?) ON DUPLICATE KEY UPDATE marks = VALUES(marks)`, [mark.uname, mark.marks]);


      const respone : updateMarksResponseFormat = updateMarksFormatter(false , "" , "Marks updated successfully");
      
      return respone as updateMarksResponseFormat;

    } 
    catch (err: any) {
      const responeError : updateMarksResponseFormat = updateMarksFormatter(true , err.message , "");

      return responeError as updateMarksResponseFormat;
    }
}
export default updateMarksFunction;