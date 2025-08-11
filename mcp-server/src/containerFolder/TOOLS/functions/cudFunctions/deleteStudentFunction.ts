import { connectMaster } from "../../../dbConnection/connect_master.js";
import { deleteStudentInputFormat, deleteStudentResponseFormat } from "../../formats/cudFormat/deleteStudentFormat.js";
import deleteStudentFormatter from "../../formatters/cudFormatters/deleteStudentFormatter.js";

async function deleteStudentFunction<T>(student : deleteStudentInputFormat): Promise<deleteStudentResponseFormat>{

  try {
      const connectionMaster = await connectMaster();

      await connectionMaster.query(`DELETE FROM auth WHERE uname = ? `, [student.uname]);


      const respone : deleteStudentResponseFormat = deleteStudentFormatter(false , "" , "Student deleted successfully");
      
      return respone as deleteStudentResponseFormat;

    } 
    catch (err: any) {
      const responeError : deleteStudentResponseFormat = deleteStudentFormatter(true , err.message , "");

      return responeError as deleteStudentResponseFormat;
    }
}
export default deleteStudentFunction;