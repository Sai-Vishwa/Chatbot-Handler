
import { Request , Response } from "express";
import { connectSlave } from "../dbConnection/connector_slave.js";

interface requestType {
    session: string;
}

interface role {
    role:string
}

interface tool {
    id: number,
    description: string,
    name: string,
    user_type?: string
}

interface access {
    tool_id: number,
}

async function displayAvailableTools(req : Request & {body : requestType}, res: Response) {


    try{
        const session : string = req.body.session;
        const connectionSlave = await connectSlave();
        const [roleType] = await connectionSlave.query(`SELECT a.role FROM session s , auth a  WHERE s.session = ? and s.uname=a.uname`, [session]);
        const role: role[] = roleType as role[];


        const [allTools] = await connectionSlave.query(`SELECT * from tools`);

        const [available] = await connectionSlave.query(`SELECT tool_id from access where user_type = ?`, [role[0].role]);

        const tools: tool[] = allTools as tool[];
        const access: access[] = available as access[];

        let available_tools: tool[] = [];
        let unavailable_tools: tool[] = [];

        tools.forEach((tool) => {
            if (access.map(a => a.tool_id).includes(tool.id)) {
                available_tools.push(tool);
            } else {
                unavailable_tools.push(tool);
            }
        });



        res.status(200).json({
            available_tools: available_tools,
            unavailable_tools: unavailable_tools,
            msg :"Login successful"
        });

        return;
    }
    catch(err: any) {
        console.log(err);
        res.status(200).json({
            err: "Internal Server Error",
        });
        return;
    }
    
}

export default displayAvailableTools;