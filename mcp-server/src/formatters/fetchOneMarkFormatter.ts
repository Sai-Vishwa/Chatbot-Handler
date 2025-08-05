import { string } from "zod";
import { Mark, Marks_Response_Format } from "../formats/marksFormat";

function fetchOneMarkFormatter(isError : boolean , errorMessage ?: string , response ?: Array <Mark>) : Marks_Response_Format {

    if(isError){
        const result : Marks_Response_Format = {
            isErrorResponse : true , 
            errorMessage : errorMessage == null || typeof errorMessage != 'string' || errorMessage == "" ?  "some internal error" : errorMessage , 
            result : [] , 
        }
        return result;
    }
    else {
        const result : Marks_Response_Format = {
            isErrorResponse : false , 
            errorMessage : "",
            result : (!response || (Array.isArray(response) && response.length === 0)) ? [] : response 
        }
        return result;
    }
    
}

module.exports = {
    fetchOneMarkFormatter
}