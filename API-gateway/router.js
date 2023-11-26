import express from "express";
import authRouter from "./src/auth/authRouter.js";
import booksRouter from "./src/books/booksRouter.js"
const router = express.Router();

router.use("/auth", authRouter);
router.use("/books", booksRouter);

export default router;