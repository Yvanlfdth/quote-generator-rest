import { Router } from "express";
import LoginController from "@controllers/auth/login.controller";

class AuthRoutes {
    router = Router();
    loginController = new LoginController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/login', this.loginController.login);
    }
}

export default new AuthRoutes().router;