import { Request, Response } from "express";
import MiscService from "@src/services/_misc.service";
import QuoteService from "@src/services/quote.service";

export default class QuoteController {
    /**
     * Get random quotes, based on parameters
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async getRandomQuotes(req: Request, res: Response) {
        const miscService = new MiscService();
        const body = miscService.sanitizeData(req.body);
        new QuoteService().getQuotes(body, res, true);
    };

    /**
     * Get one random quote, based on parameters
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async getOneRandomQuote(req: Request, res: Response) {
        const miscService = new MiscService();
        const body = miscService.sanitizeData(req.body);
        console.log(body)
        new QuoteService().getQuotes(body, res, false);
    };
}