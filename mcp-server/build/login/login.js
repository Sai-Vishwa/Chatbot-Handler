import { connectSlave } from "../dbConnection/connector_slave.js";
import generateSession from "../sessionGenerator/sessionGenerator.js";
async function login(req, res) {
    const uname = req.body.uname;
    const password = req.body.password;
    const connectionSlave = await connectSlave();
    const [sysPassword] = await connectionSlave.query(`SELECT password FROM users WHERE uname = ?`, [uname]);
    const sysPwd = sysPassword;
    if (sysPwd[0].password !== password) {
        res.status(200).json({
            err: "Invalid login"
        });
        return;
    }
    const session = generateSession();
    await connectionSlave.query(`INSERT INTO session (session , uname) values ? , ?`, [session, uname]);
    res.status(200).json({
        session: session,
        msg: "Login successful"
    });
    return;
}
export default login;
