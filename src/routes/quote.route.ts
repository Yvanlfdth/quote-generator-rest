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
        this.router.get('/:id', this.quoteController.getContact);
        this.router.post('/', this.quoteController.createContact);
        this.router.patch('/:id', this.quoteController.updateContact);
        this.router.delete('/:id', this.quoteController.deleteContact);
    }
}

export default new QuoteRoutes().router;