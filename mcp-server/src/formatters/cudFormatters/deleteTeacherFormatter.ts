import { deleteTeacherResponseFormat } from "../../formats/cudFormat/deleteTeacherFormat.js";

function deleteTeacherFormatter(isError : boolean , errorMessage ?: string , response ?: string) : deleteTeacherResponseFormat {

    if(isError){
        const result : deleteTeacherResponseFormat = {
            isErrorResponse : true , 
            errorMessage : errorMessage == null || typeof errorMessage != 'string' || errorMessage == "" ?  "some internal error" : errorMessage , 
            result : "",
        }
        return result;
    }
    else {
        const result : deleteTeacherResponseFormat = {
            isErrorResponse : false , 
            errorMessage : "",
            result : (!response || typeof response !== 'string' || response === "") ? "Teacher deleted successfully" : response 
        }
        return result;
    }
    
}

export default deleteTeacherFormatter
