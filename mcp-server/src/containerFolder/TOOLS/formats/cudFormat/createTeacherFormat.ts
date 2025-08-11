interface createTeacherInputFormat {
    name: string;
    uname: string;
    password: string;
}

interface createTeacherResponseFormat {
    isErrorResponse: boolean;
    errorMessage?: string;
    result: string;
}

export type { createTeacherInputFormat, createTeacherResponseFormat }