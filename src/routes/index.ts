import { Application } from "express";
import MiscRoutes from "./misc.route";
import QuoteRoutes from "./quote.route";
import SetupRoutes from "./setup.route";

export default class Routes {
    constructor(app: Application) {
        app.use("/", MiscRoutes);
        app.use("/quotes", QuoteRoutes);
        app.use("/setup", SetupRoutes);
    }
}