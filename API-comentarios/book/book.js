import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Book = database.define('Book', {
  livroId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  volumeInfo: {
    type: DataTypes.JSON,
    allowNull: false,
  }
});

Book.sync();

export default Book;