import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User } from "@models/user.model";

export default class LoginController {
    /**
     * Login the user
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
            const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
                expiresIn: '1h',
            });

            res.json({ token: token, role: user.role });
        }
        catch(error) {
            res.status(500).send("authentication_failed");
        }
    };
}