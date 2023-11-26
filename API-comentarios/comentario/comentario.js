import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Comentario = database.define('Comentario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  livroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  data:{
    type: DataTypes.DATE,
    allowNull: false,
  }
});

Comentario.sync();

export default Comentario;
