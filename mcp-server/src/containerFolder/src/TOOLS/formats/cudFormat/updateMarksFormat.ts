interface updateMarksInputFormat {
    uname: string;
    marks: number;
}

interface updateMarksResponseFormat {
    isErrorResponse: boolean;
    errorMessage?: string;
    result: string;
}

export type { updateMarksInputFormat, updateMarksResponseFormat }