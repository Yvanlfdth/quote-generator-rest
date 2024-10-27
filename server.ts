import express, { Application } from "express";
import Server from "@src/index";

const app: Application = express();
const server: Server = new Server(app);
const SERVER_NAME: string = process.env.SERVER ? process.env.SERVER : "localhost"; // get server from .env, otherwise inits it at 80 (http)
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 80; // get port from .env, otherwise inits it at 80 (http)

app.listen(PORT, SERVER_NAME, function () {
    console.log(`Server is running on port ${PORT}.`);
})
.on("error", (err: any) => {
    if(err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    }
    else {
        console.log(err);
    }
});