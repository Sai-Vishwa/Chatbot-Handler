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


interface fetch_One_Mark_Input_Format {
  uname: string;
}

interface fetch_Marks_In_A_Range_Input_Format {
  start?: number;
  end?: number;
}

export type { Marks_Read_Response_Format , Mark  , fetch_One_Mark_Input_Format, fetch_Marks_In_A_Range_Input_Format }; 

