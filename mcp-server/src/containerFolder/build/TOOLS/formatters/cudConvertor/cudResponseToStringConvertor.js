function cudResponseToStringConvertor(value) {
    if (value.isErrorResponse) {
        return `Error: ${value.errorMessage ?? "Unknown error occurred"}`;
    }
    return `${value.result}`;
}
export default cudResponseToStringConvertor;
