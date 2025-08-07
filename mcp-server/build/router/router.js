import { Router } from 'express';
import login from '../login/login.js';
import displayAvailableTools from '../displayTools/displayAvailableTools.js';
const router = Router();
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
router.post('/login', asyncHandler(async (req, res) => {
    console.log("im in router and this is the request i got -> ", req.body);
    await login(req, res);
}));
router.post('/fetch-tools', asyncHandler(async (req, res) => {
    await displayAvailableTools(req, res);
}));
export default router;
