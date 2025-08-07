interface createTeacherInputFormat {
    name: string;
    uname: string;
    password: string;
    role: string;
}

interface createTeacherResponseFormat {
    isErrorResponse: boolean;
    errorMessage?: string;
    result: string;
}

export { createTeacherInputFormat, createTeacherResponseFormat }