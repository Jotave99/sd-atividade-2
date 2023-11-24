import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const database = new Sequelize(process.env.PG_URI, {
  define: { timestamps: true },
  logging: false,
});

export default database;
