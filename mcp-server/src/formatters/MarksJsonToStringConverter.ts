import { Marks_Response_Format } from "../formats/marksFormat.js";

function MarksJsonToStringConverter(value : Marks_Response_Format) : string{

    if(value.result.length == 0 ){
        return "No Data available"
    }
    const formattedValue = value.result.map((mark, index) => {
        return [
        `Student ${index + 1}`,
        `Roll No : ${mark.rno ?? "N/A"}`,
        `Name    : ${mark.name ?? "N/A"}`,
        `Marks   : ${mark.marks ?? "N/A"}`,
        "---------------------"
    ].join("\n");
    }).join("\n");
    return formattedValue
}

export default MarksJsonToStringConverter
