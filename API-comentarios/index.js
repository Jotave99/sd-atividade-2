import express from "express";
import Comentario from "./comentario/comentario.js";
import Book from "./book/book.js";

const app = express();
app.use(express.json());

app.post("/api/addbook", async (req, res) => {
    const {parsedData} = req.body;

    const search = await Book.findOne({livroId: parsedData.id});

    if(!search){
        const book = await Book.create({livroId: parsedData.id, volumeInfo: parsedData.volumeInfo})

        res.json(book)
    } else {
        res.json(search);
    }
    //res.json(book);
})

app.get("/api/getlivro/:id",async (req,res)=>{

    const {id} = req.params;

    const book = await Book.findOne({livroId: id});
      
    res.json(book);
});

app.post("/api/comentario",async (req,res)=>{
    console.log(req.body.newComment);
    const { newComment } = req.body; 

    const dataAtual = new Date();
    // const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

    const comentario = await Comentario.create({livroId: newComment.livroId, usuario: newComment.usuario, texto: newComment.texto, data: dataAtual});

    res.json(comentario);
});

app.get("/api/getcomments/:id",async (req,res)=>{

    const {id} = req.params;

    const comments = await Comentario.findAll({livroId: id});
      
    res.json(comments);
});

app.patch("/api/editarcomentario", async (req,res)=>{

    const { id, texto } = req.body;

    const comentario = await Comentario.findByPk(id);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }

    await comentario.update({ texto });

    return res.json({mensagen: "editado com sucesso"}).status(200);
 
});


app.delete("/api/deletecomentario",async (req,res)=>{

    const {id,livroId, usuario} = req.body;
    
    const comentarioExlcuido = Comentario.destroy({
        where:{
            id: id,
            livroId : livroId,
            usuario : usuario,
        }
    });

    res.json({mensagen: "deletado com sucesso"}).status(200);

});


app.listen(4000,()=>{
    console.log("https://localhost:4000");   
});