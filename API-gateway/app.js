


import express from "express";
import nunjucks from "nunjucks";
import * as middleware from "./src/middleware/authorization.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { config } from "dotenv";
import axios from "axios";
import router from "./router.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
config();

const app = express();


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API REST Express sobre um sistema para explorar o consumo e publicação de serviços REST com integração com a API do Google Books ',
    version: '1.0.0',
    description:
      'Esta é uma aplicação de API REST feita com Express.' +
      'Ela utiliza dados da api do google',
    license: {
      name: 'Licenciado sob GPL.',
      url: 'https://github.com/Jotave99/sd-atividade-2',
    },
    contact: {
      name: 'Grupo SD',
      url: 'https://github.com/Jotave99/sd-atividade-2',
    },
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Servidor de desenvolvimento',
    },
  ],
  
};

const options = {
  swaggerDefinition,
  apis: ['./app.js', './books/booksRouter.js','./auth/authRouter.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(express.static('public'));
app.set('view engine', 'njk');
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
}))

nunjucks.configure('src/views', {
    autoescape: false,
    express: app
});

app.use(middleware.locals);


/**
 * @swagger
 * /:
 *   get:
 *     summary: Renderiza a pagina inicial .
 *     description: renderiza a pagina home no servidor 
 *     tags:
 *       - landingpage.njk
 *     requestBody:
 *       required: false
 *     
 *     responses:
 *       201:
 *         description: pagina criada.
 *       404:
 *         description: pagina não encontrada.
 */
app.get("/", (req, res) => {

    try{
        res.render("landingpage.njk");
      return;
    }
    catch(Error){
      res.status(404).json({erro: "pagina não encontrada"});
    }
})

/**
 * @swagger
 * /search:
 *   get:
 *     summary: renderiza a pagina de pesquisa.
 *     description: renderiza a pagina de busca por livros.
 *     tags:
 *       - search.njk
 *     requestBody:
 *       required: false
 *     responses:
 *       201:
 *         description: pagina criada.
 *       404:
 *         description: pagina não encontrada.
 */
app.get("/search", middleware.authenticate, async (req, res) => {

  try{
    res.render("search.njk");
    return;
  }
  catch(Error){
    res.status(404).json({erro: "pagina não encontrada"});
  }
});

/**
 * @swagger
 * /search:
 *   post:
 *     summary: Requisita a API de livros os livros.
 *     description: Faz uma requisição à API de livros e recebe os livros relacionados com a pesquisa.
 *     tags:
 *       - pesquisa
 *     requestBody:
 *       description: Objeto contendo o termo de pesquisa.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pesquisa:
 *                 type: string
 *     responses:
 *       201:
 *         description: Livro recebido.
 *         content:
 *           application/json:
 *             schema:
 *               type: array  # Assuming your response is an array of books; adjust as needed
 *               items:
 *                 type: object  # Assuming each item in the array is an object; adjust as needed
 *                 properties:
 *                   // Define the properties of your book object here
 *       400:
 *         description: Requisição inválida.
 */
app.post("/search", middleware.authenticate, async (req, res) => {

  const { pesquisa } = req.body;

  try{
      const livros = await axios.post("http://localhost:3000/api/livros", { pesquisa });
      res.json(livros.data);
  }
  catch(error){
    res.status(500).json({erro: "error no servidor"});
  }
});


/**
 * @swagger
 * /api/addcomment:
 *   post:
 *     summary: Adiciona um novo comentário para um livro.
 *     description: Adiciona um novo comentário para um livro identificado pelo ID fornecido.
 *     tags:
 *       - Comentários
 *     requestBody:
 *       description: Objeto contendo informações do novo comentário.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               livroid:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redireciona para a página de comentários do livro.
 *       400:
 *         description: Requisição inválida.
 *       500:
 *         description: Erro no servidor.
 */
app.post("/api/addcomment", middleware.authenticate, async(req, res) => {

  const {comment, livroid} = req.body;

  const newId = livroid.replace('/', '');
  const user = req.session.user;

  const newComment = {  
    livroId: newId,
    usuario: user,
    texto: comment,
  }

  const axiosResponse = await axios.post("http://localhost:4000/api/comentario", {newComment});

  res.redirect(`/comments/${newId}`);
})

/**
 * @swagger
 * /comentarios/{id}:
 *   get:
 *     summary: Recuperar comentários de um livro específico.
 *     description: Este endpoint recupera comentários para um livro identificado pelo ID fornecido.
 *     tags:
 *       - Comentários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do livro para o qual os comentários são solicitados.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Resposta bem-sucedida com informações do livro e comentários.
 *         content:
 *           application/json:
 *             example:
 *               livro:
 *                 id: "string"
 *                 title: "string"
 *                 # ...outras propriedades do livro
 *               comentarios:
 *                 - idComentario: "string"
 *                   idUsuario: "string"
 *                   texto: "string"
 *                   # ...outras propriedades do comentário
 *                 - idComentario: "string"
 *                   idUsuario: "string"
 *                   texto: "string"
 *                   # ...outras propriedades do comentário
 *       '404':
 *         description: Livro com o ID especificado não encontrado.
 */

app.get('/comments/:id', middleware.authenticate, async (req, res) => {
  const {id} = req.params;

  const book = await axios.get(`http://localhost:3000/api/buscalivro/${id}`);

  const comments = await axios.get(`http://localhost:4000/api/getcomments/${id}`);

  res.render('comentarios.njk', { livro: book.data, comments:  comments.data});
});

/**
 * @swagger
 * /api/adicionar-livro:
 *   post:
 *     summary: Adicionar um novo livro.
 *     description: Este endpoint adiciona um novo livro com base nas informações fornecidas.
 *     tags:
 *       - Livros
 *     parameters:
 *       - in: body
 *         name: livro
 *         description: Objeto contendo informações do novo livro.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             livro:
 *               type: string
 *     responses:
 *       '302':
 *         description: Redireciona para a página de comentários do novo livro.
 *       '400':
 *         description: Requisição inválida.
 *       '500':
 *         description: Erro no servidor.
 */

app.use("/api", router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
