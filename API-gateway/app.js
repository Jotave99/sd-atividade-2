import express from "express";
import nunjucks from "nunjucks";
import * as middleware from "./src/middleware/authorization.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import authRouter from "./src/auth/authRouter.js";
import { config } from "dotenv";
import axios from "axios";
import router from "./router.js";
config();

const app = express();


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

app.get("/", (req, res) => {
    res.render("landingpage.njk");
})

app.get("/search", middleware.authenticate, async (req, res) => {
    res.render("search.njk");
});

app.post("/search",middleware.authenticate, async (req,res)=>{
  const {pesquisa} = req.body;

  const livros = await axios.post("http://localhost:3000/api/livros", {pesquisa});

  res.json(livros.data);
});

app.post("/api/addcomment", async (req, res) => {
  const {comment, livroid} = req.body;

  const user = req.session.user;

  const newComment = {  
    livroId: livroid,
    usuario: user,
    texto: comment,
  }

  const axiosResponse = await axios.post("http://localhost:3000/api/addcomment", {newComment});

  res.redirect(`/comments/${livroid}`);
})

app.get('/comments/:id', async (req, res) => {
  const {id} = req.params;

  const book = await axios.get(`http://localhost:3000/api/buscalivro/:${id}`);

  const comments = await axios.get(`http://localhost:3000/api/getcomments/:${id}`);

  res.render('comentarios.njk', { livro: book.data, comments:  comments.data});
});

app.use("/api", router);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
