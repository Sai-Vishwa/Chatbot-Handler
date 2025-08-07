import { connectSlave } from "../dbConnection/connector_slave.js";
import generateSession from "../sessionGenerator/sessionGenerator.js";
import { connectMaster } from "../dbConnection/connector_master.js";
async function login(req, res) {
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        const connectionSlave = await connectSlave();
        const connectionMaster = await connectMaster();
        const [sysPassword] = await connectionSlave.query(`SELECT password FROM auth WHERE uname = ?`, [uname]);
        const sysPwd = sysPassword;
        if (sysPwd.length === 0) {
            res.status(200).json({
                err: "Invalid login"
            });
            return;
        }
        if (sysPwd[0].password !== password) {
            res.status(200).json({
                err: "Invalid login"
            });
            return;
        }
        const session = generateSession();
        await connectionMaster.query(`INSERT INTO session (session , uname) values (? , ?)`, [session, uname]);
        res.status(200).json({
            session: session,
            msg: "Login successful"
        });
        return;
    }
    catch (err) {
        console.error("Error in login function: ", err);
        res.status(200).json({
            err: "Internal server error"
        });
        return;
    }
}
export default login;
