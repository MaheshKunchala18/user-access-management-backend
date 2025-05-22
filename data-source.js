import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgressql",
  database: process.env.DB_NAME || "User_Access_Management",
  synchronize: true, // set false in production & use migrations
  logging: false,
  entities: [
    "./models/**/*.js",
  ],
  migrations: [
    "./migrations/**/*.js",
  ],
}); 