import { Response } from "express";
import jwt from "jsonwebtoken";

export function checkUserRole(req: any, res: Response, next: any) {
    const jwtSecretKey:any = process.env.JWT_SECRET_KEY;
    const token = req.header('authorization');
    if(!token) {
        res.status(401).send("access_denied");
        return;
    }
    try {
        const decoded:any = jwt.verify(token, jwtSecretKey);
        if(decoded.role == "admin") {
            next();
        }
        else {
            res.status(401).send("access_denied");
        }
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};