import express from "express";
import bodyParser from "body-parser";
import router from "./router/router";

const app = express();
const port = 4005;

app.use(bodyParser.json());

app.use("/",router)

app.listen(port, () => {
  console.log(`MCP server running at http://localhost:${port}`);
});
