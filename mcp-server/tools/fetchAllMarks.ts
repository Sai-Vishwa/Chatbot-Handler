import { error } from "console";
import { connectSlave } from "../dbConnection/connector_slave";

export const fetchAllMarks =  {
  
    name: "fetchAllMarks",

    description: "Returns marks of all the students",

    input_schema: {
      type: "object",     
      properties: {
        // session: { type: "string", description: "this is the user session stored in the cookie" }
      },     
      required: [
        // "session"
    ]      
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


    invoke: async () => {
        // const { session } = input as { session : string };
        const connectionSlave = await connectSlave();
        // await connectionSlave.query(`SELECT type FROM SESSION WHERE session_id=${session}`, (err: Error | null, results: any) => {
        //     if(err){
        //         return {error:err.message}
        //     }
        //     else if(results.length !== 1){
        //         return {no_access:"Wrong session... Login first"}
        //     }
        //     else if(results[0]==="student"){
        //         return {no_access:"Students can see only their marks"}
        //     }

        // })
        await connectionSlave.query('SELECT * FROM MARKS', (err: Error | null, results: any) => {
            if(err){
                return {error:err.message}
            }
            else if(results.length == 0){
                return {error:"No records found"}
            }
            else{
                return results;
            }
        });
    }
}
