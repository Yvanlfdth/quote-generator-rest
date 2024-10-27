import { Application } from "express";
import MiscRoutes from "./misc.route";
import AdminRoutes from "./admin.route";
import AuthRoutes from "./auth/auth.route";
import QuoteRoutes from "./quote.route";
import SetupRoutes from "./setup.route";

export default class Routes {
    constructor(app: Application) {
        app.use("/", MiscRoutes);
        app.use("/admin", AdminRoutes);
        app.use("/auth", AuthRoutes);
        app.use("/quotes", QuoteRoutes);
        app.use("/setup", SetupRoutes);
    }
}