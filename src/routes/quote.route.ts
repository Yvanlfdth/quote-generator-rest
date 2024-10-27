import { Router } from "express";
import QuoteController from "@controllers/quote.controller";

class QuoteRoutes {
    router = Router();
    quoteController = new QuoteController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/random', this.quoteController.getRandomQuotes);
        this.router.post('/random/one', this.quoteController.getOneRandomQuote);
    }
}

export default new QuoteRoutes().router;