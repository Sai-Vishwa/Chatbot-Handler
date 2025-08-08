import { updateMarksResponseFormat } from "../../formats/cudFormat/updateMarksFormat.js";

function updateMarksFormatter(isError : boolean , errorMessage ?: string , response ?: string) : updateMarksResponseFormat {

    if(isError){
        const result : updateMarksResponseFormat = {
            isErrorResponse : true , 
            errorMessage : errorMessage == null || typeof errorMessage != 'string' || errorMessage == "" ?  "some internal error" : errorMessage , 
            result : "",
        }
        return result;
    }
    else {
        const result : updateMarksResponseFormat = {
            isErrorResponse : false , 
            errorMessage : "",
            result : (!response || typeof response !== 'string' || response === "") ? "Marks updated successfully" : response 
        }
        return result;
    }
    
}

export default updateMarksFormatter
