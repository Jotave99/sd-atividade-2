import axios from "axios";

export const addBook = async (req, res) => {
    const {livro} = req.body;
  
    const parsedData = JSON.parse(livro);
  
    const axiosResponse = await axios.post("http://localhost:3000/api/addbook", {parsedData});

    res.redirect(`/comments/${axiosResponse.data.livroId}`);
}