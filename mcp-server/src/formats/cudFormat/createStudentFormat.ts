interface createStudentInputFormat {
    name: string;
    uname: string;
    password: string;
    role: string;
}

interface createStudentResponseFormat {
    isErrorResponse: boolean;
    errorMessage?: string;
    result: string;
}

export { createStudentInputFormat, createStudentResponseFormat }