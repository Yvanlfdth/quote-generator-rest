import { Request, Response } from "express";
import MiscService from "@src/services/_misc.service";
import QuoteService from "@src/services/quote.service";

export default class AdminController {
    /**
     * get random quotes, based on parameters
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async createQuote(req: Request, res: Response) {
        const miscService = new MiscService();
        let body = miscService.sanitizeData(req.body);
        new QuoteService().getQuotes(body, res, true);
    };
}