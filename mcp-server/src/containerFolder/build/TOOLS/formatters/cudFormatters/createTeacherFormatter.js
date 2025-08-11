function createTeacherFormatter(isError, errorMessage, response) {
    if (isError) {
        const result = {
            isErrorResponse: true,
            errorMessage: errorMessage == null || typeof errorMessage != 'string' || errorMessage == "" ? "some internal error" : errorMessage,
            result: "",
        };
        return result;
    }
    else {
        const result = {
            isErrorResponse: false,
            errorMessage: "",
            result: (!response || typeof response !== 'string' || response === "") ? "Student added successfully" : response
        };
        return result;
    }
}
export default createTeacherFormatter;
