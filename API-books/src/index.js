import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from "cors";
import axios from "axios";
import {router} from "./router.js";
import { config } from 'dotenv';

// Configurando dotenv
config();

const apiKey ="AIzaSyCMese8tmSxZX1RwqIAq4MpgNEzI-fHDFI";

const app = express();

app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
}))

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
    credentials: true
}));

app.post("/api/livros", async (req, res) => { 
    try {
        const {pesquisa} = req.body;
        const numeroDeResultados = 10;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${pesquisa}&${apiKey}&maxResults=${numeroDeResultados}`);
        const books = response.data.items;
        res.json({ books });        
    } catch (error) {
        res.send(error.message);
    }
})

app.use(router);

app.listen(3000, console.log("Api rodando na porta 3000"));