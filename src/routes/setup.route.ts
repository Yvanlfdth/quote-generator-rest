import { Router } from "express";
import SetupController from "@controllers/setup/setup.controller";

class QuoteRoutes {
    router = Router();
    stupController = new SetupController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get('/db/init', this.stupController.dbInit);
    }
}

export default new QuoteRoutes().router;