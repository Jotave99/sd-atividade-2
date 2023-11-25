import express from "express";
import {authRouter} from "./auth/authRouter.js";

const router = express.Router();

router.use(authRouter)

export {router};