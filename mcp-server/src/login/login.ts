import { connectSlave } from "../dbConnection/connector_slave.js";

import { Request , Response } from "express";
import generateSession from "../sessionGenerator/sessionGenerator.js";

interface requestType {
    uname : string;
    password : string;
}

interface passwordType {
    password : string;
}

async function login(req : Request & {body : requestType}, res: Response) {
    const  uname = req.body.uname;
    const password = req.body.password;
    const connectionSlave = await connectSlave();
    const [sysPassword] = await connectionSlave.query(`SELECT password FROM users WHERE uname = ?`, [uname]);
    const sysPwd : passwordType[] = sysPassword as passwordType[];
    if(sysPwd[0].password !==  password){
        res.status(200).json({
            err: "Invalid login"
        })
        return
    }
    const session : string = generateSession();
    await connectionSlave.query(`INSERT INTO session (session , uname) values ? , ?`, [session , uname]);
    res.status(200).json({
        session: session,
        msg :"Login successful"
    });
    return;
}

export default login;