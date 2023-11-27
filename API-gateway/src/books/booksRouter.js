import express from "express";
import * as booksController from "./booksController.js";

const booksRouter = express.Router();



booksRouter.post("/addbook", booksController.addBook)

export default booksRouter;