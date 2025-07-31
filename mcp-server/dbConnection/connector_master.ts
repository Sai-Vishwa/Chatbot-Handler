// db.ts

import mysql, { Connection } from 'mysql2';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const connectionMaster: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  socketPath: process.env.SOCKETPATH_MASTER,
  port: 3307,
});

connectionMaster.connect((err: Error | null) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connectionMaster.threadId);
});

connectionMaster.query('SELECT NOW()', (err: Error | null, results: any) => {
  if (err) throw err;
  console.log('Current time:', results[0]);
});

export default connectionMaster;
