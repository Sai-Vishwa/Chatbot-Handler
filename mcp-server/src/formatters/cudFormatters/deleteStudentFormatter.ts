import { deleteStudentResponseFormat } from "../../formats/cudFormat/deleteStudentFormat.js";

function deleteStudentFormatter(isError : boolean , errorMessage ?: string , response ?: string) : deleteStudentResponseFormat {

    if(isError){
        const result : deleteStudentResponseFormat = {
            isErrorResponse : true , 
            errorMessage : errorMessage == null || typeof errorMessage != 'string' || errorMessage == "" ?  "some internal error" : errorMessage , 
            result : "",
        }
        return result;
    }
    else {
        const result : deleteStudentResponseFormat = {
            isErrorResponse : false , 
            errorMessage : "",
            result : (!response || typeof response !== 'string' || response === "") ? "Student deleted successfully" : response 
        }
        return result;
    }
    
}

export default deleteStudentFormatter
