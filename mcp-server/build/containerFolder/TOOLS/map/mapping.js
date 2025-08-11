import createStudentTool from "../tools/createStudentTool.js";
import createTeacherTool from "../tools/createTeacherTool.js";
import deleteStudentTool from "../tools/deleteStudentTool.js";
import deleteTeacherTool from "../tools/deleteTeacherTool.js";
import fetchAllMarksTool from "../tools/fetchAllMarksTool.js";
import fetchMarksInARangeTool from "../tools/fetchMarksInARangeTool.js";
import fetchOneMarkTool from "../tools/fetchOneMarkTool.js";
import updateMarksTool from "../tools/updateMarksTools.js";
const tool_mapper = {
    "fetch_all_marks": fetchAllMarksTool,
    "fetch_marks_in_range": fetchMarksInARangeTool,
    "create_a_student": createStudentTool,
    "fetch_one_mark": fetchOneMarkTool,
    "delete_a_student": deleteStudentTool,
    "create_a_teacher": createTeacherTool,
    "delete_a_teacher": deleteTeacherTool,
    "update_marks": updateMarksTool
};
export { tool_mapper };
