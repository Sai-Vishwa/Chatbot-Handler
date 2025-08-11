import { connectMaster } from "../../../dbConnection/connect_master.js";
import { createTeacherInputFormat, createTeacherResponseFormat } from "../../formats/cudFormat/createTeacherFormat.js";
import createTeacherFormatter from "../../formatters/cudFormatters/createTeacherFormatter.js";

async function createTeacherFunction<T>(teacher : createTeacherInputFormat): Promise<createTeacherResponseFormat>{

  try {
      const connectionMaster = await connectMaster();

      await connectionMaster.query(`INSERT INTO AUTH(name , uname , password , role) values (?,?,?,?)`, [teacher.name, teacher.uname, teacher.password, "teacher"]);


      const respone : createTeacherResponseFormat = createTeacherFormatter(false , "" , "Student added successfully");
      
      return respone as createTeacherResponseFormat;

    } 
    catch (err: any) {
      const responeError : createTeacherResponseFormat = createTeacherFormatter(true , err.message , "");

      return responeError as createTeacherResponseFormat;
    }
}
export default createTeacherFunction;