import expres from "express";
import Comentario from "./comentario/comentario.js";

const app = expres();
app.use(expres.json());

app.post("/api/comentario",async (req,res)=>{

    const {livroId,usuario, texto } = req.body; 


    const comentario = await Comentario.create({livroId,usuario,texto});

    res.json(comentario);
});

app.get("/api/allcomentario",async (req,res)=>{

    const todosComentarios = await Comentario.findAll({
        where: {
          livroId: req.body.id
        }
      });
      
    res.json(todosComentarios);
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


app.listen(3000,()=>{
    console.log("https://localhost:3000");   
});