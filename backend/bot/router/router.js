const { Router } = require("express");
const { input } = require("../reply/basic-reply");


const router = new Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  router.post('/input', asyncHandler(async (req, res) => {
    console.log("im in router and this is the request i got -> ",req.body);
    await input(req,res);
  }));


  
  router.get("/",asyncHandler(async (req,res)=>{
    console.log("auth is working");
    res.status(200).send("HI IAM WORKING");
  }))
module.exports = {
    router
};