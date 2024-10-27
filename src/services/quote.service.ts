import { Response } from "express";
import slugify from "slugify";
import { Author } from '@models/author.model';
import { Quote } from '@models/quote.model';
import MiscService from '@services/_misc.service';

/**
 * MiscService purpose is to provide miscellenaous functions to use anywhere
 */
export default class QuoteService {
    /**
     * Checks if the id has a valid mongodb format
     * @param {string} id - the id to check
     * @param {Response} res - the response used to send the error if necessary
     * @param {boolean} multiple - determines if the function return an array of quote objects or a single quote object to client
     * @returns {Response} or no return
     */
    async getQuotes(body: any, res: Response, multiple = true) {
        const minLength = body?.minLength  || null;
        const maxLength = body?.maxLength || null;
        const tags = body?.tags || null;
        const author = body?.author || null;
        const authorId = body?.authorId || null;
        
        let match: any = {};    // match used for aggregation
        if(minLength || maxLength || tags || author || authorId) {
            match['$and'] = []; // inits match var with $and condition if any of the filter is set
        }
        // minLength filter
        if(minLength) {
            match['$and'].push({
                $expr: {
                    $gt: [
                        { $strLenCP: '$content' },
                        minLength - 1
                    ]
                }
            });
        }
        // maxLength filter
        if(maxLength) {
            match['$and'].push({
                $expr: {
                    $lt: [
                        { $strLenCP: '$content' },
                        maxLength + 1
                    ]
                }
            });
        }
        // tags filter
        if(tags) {
            let separator = tags.includes(",") ? "," : "|"; // gets used separator
            let tagsArr = tags.split(separator);
            if(separator == ",") {      // if separator is a comma, the quotes must have exactly the same tags
                match['$and'].push({
                    tags: {
                        $eq: tagsArr
                    }
                });
            }
            else {      // if separator is a pipe, the quotes must have any of the tags
                match['$and'].push({
                    tags: {
                        $in: tagsArr
                    }
                });
            }
        }
        // author filter
        if(author || authorId) {
            let authorsArr = [];
            let authors: any;
            let field = "_id";  // field used to filter, depending on author or authorId passed in parameter, default: _id
            if(authorId) {
                const miscService = new MiscService();
                authorsArr = authorId.split("|");
                authorsArr.forEach((aut: any, i: number) => {
                    miscService.checkIdFormat(aut, res);
                    // authorsArr[i] = miscService.convertStrToId(aut);
                })
            }
            else if(author) {      // if there is an author list and no author was found on basis of an id (or if there was no id)
                field = "slug";
                authorsArr = author.split("|");
                authorsArr.forEach((aut: any, i: number) => {
                    authorsArr[i] = slugify(aut);   // slugifies each author name to ease the treatment
                });
            }
            console.log(authorsArr)
            if(authorsArr.length) {       // if authors were found
                // gets all authors from db that match the authors passed in parameter
                authors = await Author.find({
                    [field]: {
                        $in: authorsArr
                    }
                });
                if(authors) {
                    let authorNames: any = [];
                    authors.forEach((aut: any) => {
                        authorNames.push(aut.name); // populates an array with author names (no slug for that in quotes collection)
                    });
                    match['$and'].push({
                        author: {
                            $in: authorNames
                        }
                    });
                }
            }
        }

        /**
         * same treatment if multiple or not, but:
         * - if multiple:
         *      - gets limit parameter, inits it at 1 if nothing in parameter
         *      - checks that limit is between 1 and 50, otherwise set it to 1 or 50 (depending if below 1 or above 50)
         *      - returns an array of quotes object
         * - if not multiple:
         *      - returns a single quote object
         */
        let quotes = null;
        if(multiple) {  // returns an array of quote objects
            let limit = body?.limit ? parseInt(body?.limit) : 1;
            limit = limit < 1 ? 1 : (limit > 50 ? 50 : limit);
            quotes = await Quote.aggregate([
                { $match: match },
                { $sample:{size: limit} }
            ]);
        }
        else {  // returns a quote object
            quotes = await Quote.aggregate([
                { $match: match },
                { $sample:{ size: 1 } }]
            );
            if(quotes.length) {
                quotes = quotes[0];
            }
        }

        res.send(quotes);
    }
}