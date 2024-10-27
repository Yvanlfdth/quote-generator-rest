import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    private config(app: Application): void {
        dotenv.config();
        const corsOptions: CorsOptions = {
            origin: "http://localhost:3000"
        };

        const dbType = process.env.DATABASE_TYPE || "mongodb";
        const dbServer = process.env.DATABASE_SERVER || "localhost";
        const dbName = process.env.DATABASE_NAME;
        const dbUsername = process.env.DATABASE_USERNAME;
        const dbPassword = process.env.DATABASE_PASSWORD;

        mongoose.connect(`${dbType}://${dbUsername}:${dbPassword}@${dbServer}/${dbName}?authSource=admin`);

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }
}