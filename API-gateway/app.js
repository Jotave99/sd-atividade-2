import express from "express";
import nunjucks from "nunjucks";
import * as middleware from "./src/middleware/authorization.js";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import session from 'express-session';
import authRouter from "./src/auth/authRouter.js";
import { config } from "dotenv";
import fs  from "fs";
config();

const app = express();


app.use(express.static('public'));
app.set('view engine', 'njk');
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
}))

nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.use(middleware.locals);
app.use(authRouter);

app.get("/", (req, res) => {
    res.render("landingpage.njk");
})

app.get("/search", middleware.authenticate, (req, res) => {
    const telaConfigData = fs.readFileSync("./telaConfig.json", "utf8");

    const telaConfig = JSON.parse(telaConfigData);

    res.render("search.njk", {telaConfig});
});

let comments = [];

app.get('/api/comments', (req, res) => {
  res.json(comments);
});

app.post('/api/comments', (req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    const newComment = { author, text };
    comments.push(newComment);

    res.redirect('/comments');
  } else {
    res.status(400).json({ error: 'Author and text are required.' });
  }
});

app.get('/comments', (req, res) => {

  const telaConfigData = fs.readFileSync("./telaConfig.json", "utf8");

    const telaConfig = JSON.parse(telaConfigData);
    
    for(comments of telaConfig.livros[0].comentarios){console.log(comments)};
  res.render('comentarios.njk', { telaConfig });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
