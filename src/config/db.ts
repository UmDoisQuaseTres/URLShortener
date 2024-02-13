import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  database: "links",
  dialect: "sqlite",
  storage: "./mydb.db",
});
