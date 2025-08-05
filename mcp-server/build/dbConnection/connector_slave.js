// db.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the root of the project
dotenv.config({ path: resolve(__dirname, '..', '..', '.env') });
let connectionMaster;
async function connectSlave() {
    try {
        connectionMaster = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            socketPath: process.env.SOCKETPATH_SLAVE,
            port: 3308,
        });
        console.log('✅ Connected to MySQL master with thread ID:', connectionMaster.threadId);
        const [rows] = await connectionMaster.query('SELECT NOW()');
        console.log('🕒 Current time:', rows);
        return connectionMaster;
    }
    catch (err) {
        console.error('❌ Error connecting to MySQL:', err);
        process.exit(1);
    }
}
export { connectSlave };
