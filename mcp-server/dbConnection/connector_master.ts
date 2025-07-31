// db.ts

import mysql, { Connection } from 'mysql2/promise';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

let connectionMaster: Connection;

async function connectMaster() {
  try {
    connectionMaster = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      socketPath: process.env.SOCKETPATH_MASTER,
      port: 3307,
    });

    console.log('✅ Connected to MySQL master with thread ID:', connectionMaster.threadId);

    const [rows] = await connectionMaster.query('SELECT NOW()');
    console.log('🕒 Current time:', rows);

    return connectionMaster;

  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err);
    process.exit(1);
  }
}

export { connectMaster };
