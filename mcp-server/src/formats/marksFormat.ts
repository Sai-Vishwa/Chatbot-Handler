interface Mark {
  rno?: number;
  name?: string;
  marks?: number;
}

interface Marks_Response_Format {
  isErrorResponse: boolean;
  errorMessage?: string;
  result: Mark[];
}

export { Marks_Response_Format , Mark } 

