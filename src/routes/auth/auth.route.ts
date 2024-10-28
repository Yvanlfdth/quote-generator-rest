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
        this.router.post('/logout', this.loginController.logout);
    }
}

export default new AuthRoutes().router;