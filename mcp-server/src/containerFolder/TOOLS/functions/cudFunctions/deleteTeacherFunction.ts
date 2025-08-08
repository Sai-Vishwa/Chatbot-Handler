import { connectMaster } from "../../../../dbConnection/connector_master.js";
import { deleteTeacherInputFormat, deleteTeacherResponseFormat } from "../../formats/cudFormat/deleteTeacherFormat.js";
import deleteTeacherFormatter from "../../formatters/cudFormatters/deleteTeacherFormatter.js";

async function deleteTeacherFunction<T>(Teacher : deleteTeacherInputFormat): Promise<deleteTeacherResponseFormat>{

  try {
      const connectionMaster = await connectMaster();

      await connectionMaster.query(`DELETE FROM auth WHERE uname = ? `, [Teacher.uname]);


      const respone : deleteTeacherResponseFormat = deleteTeacherFormatter(false , "" , "Teacher deleted successfully");
      
      return respone as deleteTeacherResponseFormat;

    } 
    catch (err: any) {
      const responeError : deleteTeacherResponseFormat = deleteTeacherFormatter(true , err.message , "");

      return responeError as deleteTeacherResponseFormat;
    }
}
export default deleteTeacherFunction;