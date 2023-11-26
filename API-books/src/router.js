import express from "express";
import {authRouter} from "./auth/authRouter.js";
import { livrosRouter } from "./books/booksRouter.js";

const router = express.Router();

router.use(livrosRouter);
router.use(authRouter)

export {router};