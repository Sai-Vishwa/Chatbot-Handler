
import { Request , Response } from "express";
import { connectSlave } from "../dbConnection/connector_slave.js";

interface requestType {
    session: string;
}

interface role {
    role:string
}

interface tool {
    name: string,
    user_type: string
}

async function displayAvailableTools(req : Request & {body : requestType}, res: Response) {


    try{
        const session : string = req.body.session;
        const connectionSlave = await connectSlave();
        const [roleType] = await connectionSlave.query(`SELECT a.type FROM session s , auth a  WHERE s.session = ? and s.uname=a.uname`, [session]);
        const role: role[] = roleType as role[];

        const [allTools] = await connectionSlave.query(`SELECT t.id , t.name , a.user_type FROM tools t , access a where t.id=a.tool_id`);

        const tools: tool[] = allTools as tool[];

        res.status(200).json({
            available_tools: tools.filter((tool) => tool.user_type === role[0].role),
            unavailable_tools: tools.filter((tool) => tool.user_type !== role[0].role),
            msg :"Login successful"
        });

        return;
    }
    catch(err: any) {
        res.status(500).json({
            err: "Internal Server Error",
            message: err.message
        });
        return;
    }
    
}

export default displayAvailableTools;