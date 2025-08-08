import { connectMaster } from "../../../dbConnection/connector_master.js";
import { createStudentInputFormat, createStudentResponseFormat } from "../../formats/cudFormat/createStudentFormat.js";
import createStudentFormatter from "../../formatters/cudFormatters/createStudentFormatter.js";

async function createStudentFunction<T>(student : createStudentInputFormat): Promise<createStudentResponseFormat>{

  try {
      const connectionMaster = await connectMaster();

      await connectionMaster.query(`INSERT INTO AUTH(name , uname , password , role) values (?,?,?,?)`, [student.name, student.uname, student.password, "student"]);


      const respone : createStudentResponseFormat = createStudentFormatter(false , "" , "Student added successfully");
      
      return respone as createStudentResponseFormat;

    } 
    catch (err: any) {
      const responeError : createStudentResponseFormat = createStudentFormatter(true , err.message , "");

      return responeError as createStudentResponseFormat;
    }
}
export default createStudentFunction;