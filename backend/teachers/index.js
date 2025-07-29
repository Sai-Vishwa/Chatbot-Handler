const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4001;

app.use(express.json());
app.use(cors);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Teacher server is running on http://localhost:${PORT}`);
});
