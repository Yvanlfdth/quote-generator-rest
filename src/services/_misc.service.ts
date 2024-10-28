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
     * Converts a string in mongodb id format
     * @param {string} id - the id to convert
     * @returns {ObjectId} or no return
     */
    convertStrToId(id: string) {
        return new mongoose.Types.ObjectId(id);
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

    /**
     * santize a value
     * @param {any} value - the value to sanitize
     * @returns value
     */
    sanitize(value: any) {
        if(value instanceof Object) {
            for(var key in value) {
                if(/^\$/.test(key)) {
                    delete value[key];
                }
                else {
                    this.sanitize(value[key]);
                }
            }
        }
        if(/^\d+$/.test(value)) {
            value = parseInt(value);
        }

        return value;
    }

    /**
     * sanitize any value (array, object, ...)
     * @param {any} value - the value to sanitize
     * @returns value
     */
    sanitizeData(value: any) {
        if(Array.isArray(value)) {
            value.forEach(elm => this.sanitizeData(elm))
        }
        if(typeof(value) === 'object' && value !== null) {
            Object.values(value).forEach((elm)=>{
                this.sanitizeData(elm);
            });
        }

        return this.sanitize(value);
    }
}