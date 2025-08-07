import { createStudentResponseFormat } from "../../formats/cudFormat/createStudentFormat.js";

function createStudentFormatter(isError : boolean , errorMessage ?: string , response ?: string) : createStudentResponseFormat {

    if(isError){
        const result : createStudentResponseFormat = {
            isErrorResponse : true , 
            errorMessage : errorMessage == null || typeof errorMessage != 'string' || errorMessage == "" ?  "some internal error" : errorMessage , 
            result : "",
        }
        return result;
    }
    else {
        const result : createStudentResponseFormat = {
            isErrorResponse : false , 
            errorMessage : "",
            result : (!response || typeof response !== 'string' || response === "") ? "Student added successfully" : response 
        }
        return result;
    }
    
}

export default createStudentFormatter
