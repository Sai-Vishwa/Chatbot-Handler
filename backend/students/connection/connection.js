const mysql = require('mysql2');

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',     // or your DB host
  user: 'root',          // your MySQL username
  password: 'yourpass',  // your MySQL password
  database: 'yourdbname' // your database name
});

// Connect
connection.connect((err) => {
  if (err) {``
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

// Sample query
connection.query('SELECT NOW()', (err, results) => {
  if (err) throw err;
  console.log('Current time:', results[0]);
});
