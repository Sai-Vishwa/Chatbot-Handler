const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port =  4000;
const { authProxy, basicProxy, submissionProxy, adminProxy, botProxy } = require('./proxy');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log("This is getting called -> ",req.path , "  and this is the body -> ", req.body)
    next();
  })

app.use("/login",authProxy);

app.use("/bot",botProxy);


app.get('/', (req, res) => {
  res.send('Backend is running!');
});


app.listen(port, () => {
    console.log(`Backend routes are handled with proxies here at port - ${port}`);
})