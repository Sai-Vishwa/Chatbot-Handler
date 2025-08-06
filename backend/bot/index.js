const express = require('express');

const cors = require('cors');
const { router } = require('./router/router');

const app = express();
const port =  4004;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    next();
  })


app.get('/', (req, res) => {
  res.send('Backend is running!');

});


app.use("/bot",router)

app.listen(port, () => {
    console.log(`Backend routes are handled with proxies here at port - ${port}`);
})