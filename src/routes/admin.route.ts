import { Router } from "express";
import AdminController from "@controllers/admin.controller";
import { verifyToken } from "@middlewares/auth.middleware";

class AdminRoutes {
    router = Router();
    adminController = new AdminController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/quote/add', verifyToken, this.adminController.createQuote);
    }
}

export default new AdminRoutes().router;