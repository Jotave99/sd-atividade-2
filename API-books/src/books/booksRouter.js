import express from "express";
import * as livroController from "./booksController.js";

const livrosRouter = express.Router();

livrosRouter.post("/api/livros", livroController.search)
livrosRouter.post("/api/addbook", livroController.addbook)
livrosRouter.get("/api/buscaLivro/:id", livroController.getLivro);
livrosRouter.post("/api/addcomment", livroController.addcomment);
livrosRouter.get("/api/getcomments/:id", livroController.getComments)

export {livrosRouter};