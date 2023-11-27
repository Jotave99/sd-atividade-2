import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const database = new Sequelize(process.env.PG_URI, {
  host: "172.17.0.2",
  dialect: "postgres",
  define: { timestamps: true },
  logging: false,
});

// const database = new Sequelize("postgres", "postgres", "passwd", {
// 	host: "localhost",
// 	port: "5432",
// 	dialect: 'postgres'
// });

try {
  await database.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default database;
