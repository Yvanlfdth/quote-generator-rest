import { Request, Response } from "express";
import MiscService from "@src/services/_misc.service";
import { Quote } from '@models/quote.model';

export default class QuoteController {
    async getRandomQuote(req: Request, res: Response) {
        const quotes = await Quote.find();
        res.send(quotes);
    };

    async getContact(req: Request, res: Response) {
        let id = req.params.id;
        let miscService = new MiscService();
        miscService.checkIdFormat(id, res);

        const contact = await Quote.findById(id);
        miscService.sendRes(contact, res);
    };

    async createContact(req: Request, res: Response) {
        let contact = await Quote.create(req.body);
        res.send(contact);
    };

    async updateContact(req: Request, res: Response) {
        let id = req.params.id;
        let miscService = new MiscService();

        miscService.checkIdFormat(id, res);

        let contact = await Quote.findByIdAndUpdate(id, req.body, { new: true });
        miscService.sendRes(contact, res);
    };

    async deleteContact(req: Request, res: Response) {
        let id = req.params.id;
        let miscService = new MiscService();

        miscService.checkIdFormat(id, res);

        let contact = await Quote.findByIdAndDelete(id);
        miscService.sendRes(contact, res);
    };
}