import axios from "axios";

const apiKey ="AIzaSyCMese8tmSxZX1RwqIAq4MpgNEzI-fHDFI";

export const search = async (req, res) => {
    try {
        const {pesquisa} = req.body;
        const numeroDeResultados = 10;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${pesquisa}&${apiKey}&maxResults=${numeroDeResultados}`);
        const books = response.data.items;
        res.json({ books });        
    } catch (error) {
        res.send(error.message);
    }
}

export const getLivro = async (req, res)=>{
    try {
        const { idLivro } = req.params;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${idLivro}&key=${apiKey}`);
        const livro = response.data.items[0].volumeInfo;
        res.json({livro});
    } catch (err) {
        res.send(err);
    }
};