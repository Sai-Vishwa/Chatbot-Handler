import { toolsFormat } from "../formats/toolsFormat/toolsFormat";
import createStudentTool from "../tools/createStudentTool";
import createTeacherTool from "../tools/createTeacherTool";
import deleteStudentTool from "../tools/deleteStudentTool";
import deleteTeacherTool from "../tools/deleteTeacherTool";
import fetchAllMarksTool from "../tools/fetchAllMarksTool";
import fetchMarksInARangeTool from "../tools/fetchMarksInARangeTool";
import fetchOneMarkTool from "../tools/fetchOneMarkTool";
import updateMarksTool from "../tools/updateMarksTools";

interface Tool_Mapper {
    [key : string] : toolsFormat
}

const tool_mapper : Tool_Mapper = {
    "fetch_all_marks": fetchAllMarksTool,
    "fetch_marks_in_range": fetchMarksInARangeTool,
    "create_a_student": createStudentTool,
    "fetch_one_mark": fetchOneMarkTool,
    "delete_a_student": deleteStudentTool,
    "create_a_teacher": createTeacherTool,
    "delete_a_teacher": deleteTeacherTool,
    "update_marks": updateMarksTool
}

export { tool_mapper, Tool_Mapper };