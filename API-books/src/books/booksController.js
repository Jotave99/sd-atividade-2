import axios from "axios";

const apiKey ="AIzaSyCMese8tmSxZX1RwqIAq4MpgNEzI-fHDFI";

export const addbook = async (req, res) => {
    const {parsedData} = req.body;

    const axiosResponse = await axios.post("http://localhost:4000/api/addbook", {parsedData});

    res.json(axiosResponse.data);
}

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
        const { id } = req.params;

        const response = await axios.get(`http://localhost:4000/api/getlivro/:${id}`);

        res.json(response.data);
    } catch (err) {
        res.send(err);
    }
};

export const getComments = async (req, res)=>{
    try {
        const { id } = req.params;

        const response = await axios.get(`http://localhost:4000/api/getcomments/:${id}`);

        res.json(response.data);
    } catch (err) {
        res.send(err);
    }
};