import { Request, Response } from "express";
import path from 'path';
import fs from "fs";
import { Author } from '@models/author.model';
import { Quote } from '@models/quote.model';
import { Tag } from '@models/tag.model';

export default class QuoteController {
    /**
     * Populates db with init data from json files
     * @param {Request} req - request data
     * @param {Response} res - response data
     */
    async dbInit(req: Request, res: Response) {
        // inits authors, quotes and tags variables
        let authors = null;
        let quotes = null;
        let tags = null;
        // gets data from json files (from root "assets" dir)
        try {
            authors = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../assets/init/authors.json'), 'utf8'));
            quotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../assets/init/quotes.json'), 'utf8'));
            tags = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../assets/init/tags.json'), 'utf8'));
        }
        catch(err) {
            res.status(400).send("json_files_read_error");
            return;
        }

        // check if variables aren't empty
        if(!authors || !quotes || !tags) {
            res.status(400).send("empty_json_files_error");
            return;
        }

        // if no error, first resets the db tables
        try {
            await Author.find().deleteMany({});
            await Quote.find().deleteMany({});
            await Tag.find().deleteMany({});
        }
        catch(err) {
            res.status(400).send("empty_db_tables_error");
            return;
        }

        // Authors
        let authorsArr: Array<Object> = [];    // array that will contain all authors
        authors.forEach((author: any) => {
            // try... catch used in case of missing required fields
            try {
                authorsArr.push({
                    name: author.name,
                    link: author.link,
                    bio: author?.bio || null,
                    description: author?.description || null
                });
            }
            catch(err) {
                res.status(400).send("author_lack_field_error");
                return;
            }
        });
        try {
            await Author.insertMany(authorsArr);
        }
        catch(err) {
            res.status(400).send("populate_authors_table_error");
            return;
        }

        // Quotes
        let quotesArr: Array<Object> = [];    // array that will contain all quotes
        quotes.forEach((quote: any) => {
            // try... catch used in case of missing required fields
            try {
                quotesArr.push({
                    content: quote.content,
                    author: quote.author,
                    tags: quote?.tags || []
                });
            }
            catch(err) {
                res.status(400).send("quote_lack_field_error");
                return;
            }
        });
        try {
            await Quote.insertMany(quotesArr);
        }
        catch(err) {
            res.status(400).send("populate_quotes_table_error");
            return;
        }

        // Tags
        let tagsArr: Array<Object> = [];    // array that will contain all tags
        tags.forEach((tag: any) => {
            // try... catch used in case of missing required fields
            try {
                tagsArr.push({
                    name: tag.name
                });
            }
            catch(err) {
                res.status(400).send("tag_lack_field_error");
                return;
            }
        });
        try {
            await Tag.insertMany(tagsArr);
        }
        catch(err) {
            res.status(400).send("populate_tags_table_error");
            return;
        }

        res.send("db_init_success");
    };
}