import { Request, Response } from "express";
import slugify from "slugify";
import MiscService from "@src/services/_misc.service";
import { Author } from "@models/author.model";
import { Quote } from "@models/quote.model";
import { Tag } from "@models/tag.model";

export default class AdminController {
    /**
     * Quotes
     */

    /**
     * Creates a new quote in db
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async createQuote(req: Request, res: Response) {
        const miscService = new MiscService();
        const body = miscService.sanitizeData(req.body);

        if(!body?.content || !body?.author) {
            res.status(400).send("missing_data");
        }

        body.slug = slugify(body.content);
        let quote = null;

        try {
            quote = await Quote.create(body);
        }
        catch(err) {
            res.status(400).send("create_quote_error");
            return;
        }

        res.send(quote);
    };

    /**
     * Updates a quote in db
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async updateQuote(req: Request, res: Response) {
        const miscService = new MiscService();
        const params = miscService.sanitizeData(req.params);
        const body = miscService.sanitizeData(req.body);
        
        if(!params?.id) {
            res.status(400).send("missing_data");
        }

        let quote: any = await Quote.findById(params.id);
        if(quote) {
            let data = {
                content: body?.content ? body.content : quote.content,
                author: body?.author ? body.author : quote.author,
                slug: body?.content ? slugify(body.content) : quote.slug,
                tags: body?.tags ? body.tags : []
            };

            try {
                quote = await Quote.findOneAndUpdate({_id: params.id}, data, { new: true });
            }
            catch(err) {
                res.status(400).send("update_quote_error");
                return;
            }

            res.send(quote);
        }
        else {
            res.status(400).send("quote_not_found");
        }
    };

    /**
     * Deletes a quote from db
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async deleteQuote(req: Request, res: Response) {
        const miscService = new MiscService();
        const params = miscService.sanitizeData(req.params);
        
        if(!params?.id) {
            res.status(400).send("missing_data");
        }

        let quote: any = null;
        try {
            quote = await Quote.findOneAndDelete({_id: params.id});
            if(quote) {
                res.send(quote);
            }
            else {
                res.status(400).send("quote_not_found");
            }
        }
        catch(err) {
            res.status(400).send("delete_quote_error");
        }
    };

    /**
     * Authors
     */

    /**
     * Creates a new author in db
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async createAuthor(req: Request, res: Response) {
        const miscService = new MiscService();
        const body = miscService.sanitizeData(req.body);

        if(!body?.name || !body?.link) {
            res.status(400).send("missing_data");
        }

        body.slug = slugify(body.name);
        let author = null;

        try {
            author = await Author.create(body);
        }
        catch(err) {
            res.status(400).send("create_author_error");
            return;
        }

        res.send(author);
    };

    /**
     * Updates an author in db
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async updateAuthor(req: Request, res: Response) {
        const miscService = new MiscService();
        const params = miscService.sanitizeData(req.params);
        const body = miscService.sanitizeData(req.body);
        
        if(!params?.id) {
            res.status(400).send("missing_data");
        }

        let author: any = await Author.findById(params.id);
        if(author) {
            let data = {
                name: body?.name ? body.name : author.name,
                link: body?.link ? body.link : author.link,
                slug: body?.name ? slugify(body.name) : author.slug,
                bio: body?.bio ? body.bio : null,
                description: body?.description ? body.description : null,
            };

            try {
                author = await Author.findOneAndUpdate({_id: params.id}, data, { new: true });
            }
            catch(err) {
                res.status(400).send("update_author_error");
                return;
            }

            res.send(author);
        }
        else {
            res.status(400).send("author_not_found");
        }
    };

    /**
     * Deletes a author from db
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async deleteAuthor(req: Request, res: Response) {
        const miscService = new MiscService();
        const params = miscService.sanitizeData(req.params);
        
        if(!params?.id) {
            res.status(400).send("missing_data");
        }

        let author: any = null;
        try {
            author = await Author.findOneAndDelete({_id: params.id});
            if(author) {
                res.send(author);
                return;
            }
            else {
                res.status(400).send("author_not_found");
            }
        }
        catch(err) {
            res.status(400).send("delete_author_error");
        }
    };

    /**
     * Tags
     */

    /**
     * Creates a new tag in db
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async createTag(req: Request, res: Response) {
        const miscService = new MiscService();
        const body = miscService.sanitizeData(req.body);

        if(!body?.name) {
            res.status(400).send("missing_data");
        }

        body.slug = slugify(body.name);
        let tag = null;

        try {
            tag = await Tag.create(body);
        }
        catch(err) {
            res.status(400).send("create_tag_error");
            return;
        }

        res.send(tag);
    };

    /**
     * Updates a tag in db
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async updateTag(req: Request, res: Response) {
        const miscService = new MiscService();
        const params = miscService.sanitizeData(req.params);
        const body = miscService.sanitizeData(req.body);
        
        if(!params?.id) {
            res.status(400).send("missing_id");
        }
        if(!body?.name) {   // specific for tags: tags only have "name" field so if it's empty or missing there is no point to update
            res.status(400).send("missing_name");
        }

        let tag: any = await Tag.findById(params.id);
        if(tag) {
            let data = {
                name: body.name,
                slug: slugify(body.name)
            };

            try {
                tag = await Tag.findOneAndUpdate({_id: params.id}, data, { new: true });
            }
            catch(err) {
                res.status(400).send("update_tag_error");
                return;
            }

            res.send(tag);
        }
        else {
            res.status(400).send("tag_not_found");
        }
    };

    /**
     * Deletes a tag from db
     * @param {Request} req - the request initiated by the client
     * @param {Response} res - the response to send the client
     */
    async deleteTag(req: Request, res: Response) {
        const miscService = new MiscService();
        const params = miscService.sanitizeData(req.params);
        
        if(!params?.id) {
            res.status(400).send("missing_data");
        }

        let tag: any = null;
        try {
            tag = await Tag.findOneAndDelete({_id: params.id});
            if(tag) {
                res.send(tag);
            }
            else {
                res.status(400).send("tag_not_found");
            }
        }
        catch(err) {
            res.status(400).send("delete_tag_error");
        }
    };
}