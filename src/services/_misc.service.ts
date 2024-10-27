import { Response } from "express";
import mongoose from "mongoose";

/**
 * MiscService purpose is to provide miscellenaous functions to use anywhere
 */
export default class MiscService {
    /**
     * Checks if the id has a valid mongodb format
     * @param {string} id - the id to check
     * @param {Response} res - the response used to send the error if necessary
     * @returns {Response} or no return
     */
    checkIdFormat(id: string, res: Response) {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("id_format_invalid");
        }
    }

    /**
     * Sends a response based on the existence of data
     * @param {any} data - the data to check
     * @param res - the data if it is set, otherwise an 404 error
     */
    sendRes(data: any, res: Response) {
        if(data) {
            res.send(data);
        }
        else {
            res.status(404).send("data_not_found");
        }
    }
}