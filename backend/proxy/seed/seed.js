const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..', '.env')})

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  socketPath: process.env.SOCKETPATH,
  port: 3307,
});

const text = process.env.SOCKETPATH

console.log("inga paaru - > ", text)

connection.connect((err) => {
  if (err) {``
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

connection.query('SELECT NOW()', (err, results) => {
  if (err) throw err;
  console.log('Current time:', results[0]);
});
