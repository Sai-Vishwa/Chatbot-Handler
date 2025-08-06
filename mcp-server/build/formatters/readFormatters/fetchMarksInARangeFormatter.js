function fetchMarksInARangeFormatter(isError, errorMessage, response) {
    if (isError) {
        const result = {
            isErrorResponse: true,
            errorMessage: errorMessage == null || typeof errorMessage != 'string' || errorMessage == "" ? "some internal error" : errorMessage,
            result: [],
        };
        return result;
    }
    else {
        const result = {
            isErrorResponse: false,
            errorMessage: "",
            result: (!response || (Array.isArray(response) && response.length === 0)) ? [] : response
        };
        return result;
    }
}
export default fetchMarksInARangeFormatter;
