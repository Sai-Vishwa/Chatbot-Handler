import { createStudentResponseFormat } from "../../formats/cudFormat/createStudentFormat.js";

function cudResponseToStringConvertor(value: createStudentResponseFormat): string {
    if (value.isErrorResponse) {
        return `Error: ${value.errorMessage ?? "Unknown error occurred"}`;
    }
    return `${value.result}`;
}

export default cudResponseToStringConvertor;
