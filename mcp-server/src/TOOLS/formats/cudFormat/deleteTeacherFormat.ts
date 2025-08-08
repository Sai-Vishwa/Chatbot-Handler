interface deleteTeacherInputFormat {
    uname: string;
}

interface deleteTeacherResponseFormat {
    isErrorResponse: boolean;
    errorMessage?: string;
    result: string;
}

export { deleteTeacherInputFormat, deleteTeacherResponseFormat }