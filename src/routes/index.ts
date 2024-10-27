import { Application } from "express";
import QuoteRoutes from "./quote.route";
import SetupRoutes from "./setup.route";

export default class Routes {
    constructor(app: Application) {
        app.use("/quotes", QuoteRoutes);
        app.use("/setup", SetupRoutes);
    }
}