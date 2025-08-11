interface createStudentInputFormat {
    name: string;
    uname: string;
    password: string;
}

interface createStudentResponseFormat {
    isErrorResponse: boolean;
    errorMessage?: string;
    result: string;
}

export type { createStudentInputFormat, createStudentResponseFormat }