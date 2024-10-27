import { Application } from "express";
import QuoteRoutes from "./quote.route";

export default class Routes {
    constructor(app: Application) {
        app.use("/quotes", QuoteRoutes);
    }
}