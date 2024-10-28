import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User } from "@models/user.model";

export default class LoginController {
    /**
     * Logs the user
     * @param {any} req - the request initiated by the client
     * @param {any} res - the response to send the client
     */
    async login(req: any, res: any) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if(!user) {
                return res.status(401).send("authentication_failed_user_not_found");
            }

            const passwordMatch = await bcryptjs.compare(password, user.password);
            if(!passwordMatch) {
                return res.status(401).send("authentication_failed_password_not_match");
            }

            const jwtSecretKey: any = process.env.JWT_SECRET_KEY;
            const payload = {
                userId: user.id,
                role: user.role,
                iat: Date.now(),
                exp: Date.now() + (60 * 60)
            };
            const token = jwt.sign(payload, jwtSecretKey);

            res.json({ token });
        }
        catch(error) {
            res.status(500).send("authentication_failed");
        }
    };

    /**
     * Logs out the user
     * @param {any} req - the request initiated by the client
     * @param {any} res - the response to send the client
     */
    logout(req: any, res: any) {
        const jwtSecretKey: any = process.env.JWT_SECRET_KEY;
        const token = req.header('authorization');
        if(!token) {
            res.send("already_logged_out");
            return;
        }
        try {
            const decoded:any = jwt.verify(token, jwtSecretKey);
            const payload = {
                userId: decoded.id,
                role: decoded.role,
                iat: Date.now(),
                exp: Date.now() -1
            };
            jwt.sign(payload, jwtSecretKey);
            res.clearCookie('jwt');
            res.send("logged_out");
        }
        catch(error) {
            res.status(401).send("invalid_token");
        }
    };
}