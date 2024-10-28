import { Response } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: any, res: Response, next: any) {
    const jwtSecretKey:any = process.env.JWT_SECRET_KEY;
    const token = req.header('authorization');
    if(!token) {
        res.status(401).send("access_denied");
        return;
    }
    try {
        const decoded:any = jwt.verify(token, jwtSecretKey);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).send("invalid_token");
    }
};