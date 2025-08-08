interface deleteStudentInputFormat {
    uname: string;
}

interface deleteStudentResponseFormat {
    isErrorResponse: boolean;
    errorMessage?: string;
    result: string;
}

export { deleteStudentInputFormat, deleteStudentResponseFormat }