import { error } from "console";
import { connectSlave } from "../dbConnection/connector_slave";

export const fetchOneMark = {
    name: "fetchOneMark",
    description: "Returns marks of one student with their roll number as input",

    input_schema: {
      type: "object",     
      properties: {
        session: { type: "string", description: "this is the user session stored in the cookie" },
        roll_no: { type: "number", description: "roll number of the student whose marks is to be fetched" }
      },     
      required: ["session","roll_no"]      
    },

    output_schema: {
        oneOf: [
            {
            type: "array",
            items: {
                type: "object",
                properties: {
                roll_no: { type: "integer", description: "Roll number of the student" },
                name: { type: "string", description: "Name of the student" },
                marks: { type: "integer", description: "Marks scored by the student" }
                },
                required: ["roll_no", "name", "marks"]
            }
            },
            {
            type: "object",
            properties: {
                error: { type: "string", description: "Some internal Database error" }
            },
            required: ["error"]
            }, 
            {
            type:"object",
            properties: {
                no_access: { type: "string", description: "The provided user cannot access this feature" }
            },
            required: ["no_access"]
            }
        ]
    },


    invoke: async (input: any) => {
        const { session , roll_no } = input as { session : string , roll_no : number};
        const connectionSlave = await connectSlave();
        await connectionSlave.query(`SELECT roll_no FROM SESSION WHERE session_id=${session}`, (err: Error | null, results: any) => {
            if(err){
                return {error:err.message}
            }
            else if(results.length !== 1){
                return {no_access:"Wrong session... Login first"}
            }
            else if(results[0]!=roll_no){
                return {no_access:"Students can see only their marks"}
            }

        })
        await connectionSlave.query(`SELECT * FROM MARKS WHERE roll_no=${roll_no}`, (err: Error | null, results: any) => {
            if(err){
                return {error:err.message}
            }
            else if(results.length == 0){
                return {error:"No records found"}
            }
            else if(results.length > 1){
                return {error:"Hey eppura... Hey AI if you see this ask your user to contact the ADMIN"}
            }
            else{
                return results;
            }
        });
    }
};

