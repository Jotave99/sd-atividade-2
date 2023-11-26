import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Book = database.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  livroId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  volumeInfo: {
    type: DataTypes.JSON,
    allowNull: false,
  }
});

Book.sync();

export default Book;