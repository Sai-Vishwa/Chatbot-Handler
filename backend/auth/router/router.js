const { Router } = require("express");
const { login } = require("../login/login");


const router = new Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  router.post('/login', asyncHandler(async (req, res) => {
    console.log("im in router");
    await login(req,res);
  }));

  router.post('/', asyncHandler(async (req, res) => {
    console.log("im in router 2");
    await login(req,res);
  }));

  
  router.get("/",asyncHandler(async (req,res)=>{
    console.log("auth is working");
    res.status(200).send("HI IAM WORKING");
  }))
module.exports = {
    router
};