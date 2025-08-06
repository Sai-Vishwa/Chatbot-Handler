import { connectSlave } from "../dbConnection/connector_slave.js";
async function displayAvailableTools(req, res) {
    try {
        const session = req.body.session;
        const connectionSlave = await connectSlave();
        const [roleType] = await connectionSlave.query(`SELECT a.type FROM session s , auth a  WHERE s.session = ? and s.uname=a.uname`, [session]);
        const role = roleType;
        const [allTools] = await connectionSlave.query(`SELECT t.name , a.user_type FROM tools t , access a where t.id=a.tool_id`);
        const tools = allTools;
        res.status(200).json({
            Availabletools: tools.filter((tool) => tool.user_type === role[0].role),
            Unavailabletools: tools.filter((tool) => tool.user_type !== role[0].role),
            msg: "Login successful"
        });
        return;
    }
    catch (err) {
        res.status(500).json({
            err: "Internal Server Error",
            message: err.message
        });
        return;
    }
}
export default displayAvailableTools;
