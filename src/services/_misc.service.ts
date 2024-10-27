import { Response } from "express";
import mongoose from "mongoose";

export default class MiscService {
    checkIdFormat(id: string, res: Response) {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("id_format_invalid");
        }
    }

    sendRes(data: any, res: Response) {
        if(data) {
            res.send(data);
        }
        else {
            res.status(404).send("data_not_found");
        }
    }
}