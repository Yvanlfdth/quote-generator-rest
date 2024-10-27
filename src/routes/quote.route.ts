import { Router } from "express";
import QuoteController from "@controllers/quote.controller";

class QuoteRoutes {
    router = Router();
    quoteController = new QuoteController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get('/random', this.quoteController.getRandomQuote);
    }
}

export default new QuoteRoutes().router;