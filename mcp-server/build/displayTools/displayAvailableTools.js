import { connectSlave } from "../dbConnection/connector_slave.js";
async function displayAvailableTools(req, res) {
    try {
        const session = req.body.session;
        const connectionSlave = await connectSlave();
        const [roleType] = await connectionSlave.query(`SELECT a.role FROM session s , auth a  WHERE s.session = ? and s.uname=a.uname`, [session]);
        const role = roleType;
        const [allTools] = await connectionSlave.query(`SELECT * from tools`);
        const [available] = await connectionSlave.query(`SELECT tool_id from access where user_type = ?`, [role[0].role]);
        const tools = allTools;
        const access = available;
        let available_tools = [];
        let unavailable_tools = [];
        tools.forEach((tool) => {
            if (access.map(a => a.tool_id).includes(tool.id)) {
                available_tools.push(tool);
            }
            else {
                unavailable_tools.push(tool);
            }
        });
        res.status(200).json({
            available_tools: available_tools,
            unavailable_tools: unavailable_tools,
            msg: "Login successful"
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            err: "Internal Server Error",
        });
        return;
    }
}
export default displayAvailableTools;
