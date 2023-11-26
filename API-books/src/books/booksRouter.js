import express from "express";
import * as livroController from "./booksController.js";

const livrosRouter = express.Router();

livrosRouter.post("/api/livros", livroController.search)

livrosRouter.get("/api/buscaLivro/:id", livroController.getLivro);

export {livrosRouter};