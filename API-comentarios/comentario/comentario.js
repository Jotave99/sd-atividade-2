import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Comentario = database.define('Comentario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  livroId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  data:{
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Comentario.sync();

export default Comentario;
