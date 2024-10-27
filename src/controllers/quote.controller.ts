import { Request, Response } from "express";
import MiscService from "@src/services/_misc.service";
import { Quote } from '@models/quote.model';

export default class QuoteController {
    async getRandomQuote(req: Request, res: Response) {
        const quotes = await Quote.find();
        res.send(quotes);
    };
}