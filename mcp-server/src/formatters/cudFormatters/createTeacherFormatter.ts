import { createTeacherResponseFormat } from "../../formats/cudFormat/createTeacherFormat.js";

function createTeacherFormatter(isError : boolean , errorMessage ?: string , response ?: string) : createTeacherResponseFormat {

    if(isError){
        const result : createTeacherResponseFormat = {
            isErrorResponse : true , 
            errorMessage : errorMessage == null || typeof errorMessage != 'string' || errorMessage == "" ?  "some internal error" : errorMessage , 
            result : "",
        }
        return result;
    }
    else {
        const result : createTeacherResponseFormat = {
            isErrorResponse : false , 
            errorMessage : "",
            result : (!response || typeof response !== 'string' || response === "") ? "Student added successfully" : response 
        }
        return result;
    }
    
}

export default createTeacherFormatter
