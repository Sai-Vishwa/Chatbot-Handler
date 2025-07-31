import { connectMaster } from "../dbConnection/connector_master";

async function seedDB() {
  const connection = await connectMaster();

  await connection.query(`DROP TABLE IF EXISTS session`);
  await connection.query(`DROP TABLE IF EXISTS teacher`);
  await connection.query(`DROP TABLE IF EXISTS marks`);

  await connection.query(`
    CREATE TABLE teacher (
      rno INT PRIMARY KEY,
      name VARCHAR(100)
    )
  `);

  await connection.query(`
    CREATE TABLE marks (
      rno INT PRIMARY KEY,
      name VARCHAR(100),
      marks INT
    )
  `);

  await connection.query(`
    CREATE TABLE session (
      id INT AUTO_INCREMENT PRIMARY KEY,
      session VARCHAR(100),
      type ENUM('student', 'teacher'),
      rno INT
    )
  `);

  await connection.query(`INSERT INTO teacher (rno, name) VALUES 
    (1, 'VigneshTeacher')
  `);

  await connection.query(`INSERT INTO marks (rno, name, marks) VALUES 
    (1, 'VigneshStudent1', 85),
    (2, 'VigneshStudent2', 90),
    (3, 'VigneshStudent3', 49)
  `);

  console.log('✅ Database seeded successfully');
  await connection.end();
}

seedDB().catch(console.error);
