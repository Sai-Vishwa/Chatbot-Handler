interface Mark {
  rno?: number;
  name?: string;
  marks?: number;
}

interface Marks_Read_Response_Format {
  isErrorResponse: boolean;
  errorMessage?: string;
  result: Mark[];
}

export type { Marks_Read_Response_Format , Mark } 

