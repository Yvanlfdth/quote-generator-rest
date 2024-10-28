import { Router } from "express";
import AdminController from "@controllers/admin.controller";
import { verifyToken } from "@middlewares/auth.middleware";
import { checkUserRole } from "@middlewares/role.middleware";

class AdminRoutes {
    router = Router();
    adminController = new AdminController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        // quote
        this.router.post('/quote/create', verifyToken, checkUserRole, this.adminController.createQuote);
        this.router.patch('/quote/update/:id', verifyToken, checkUserRole, this.adminController.updateQuote);
        this.router.delete('/quote/delete/:id', verifyToken, checkUserRole, this.adminController.deleteQuote);

        // author
        this.router.post('/author/create', verifyToken, checkUserRole, this.adminController.createAuthor);
        this.router.patch('/author/update/:id', verifyToken, checkUserRole, this.adminController.updateAuthor);
        this.router.delete('/author/delete/:id', verifyToken, checkUserRole, this.adminController.deleteAuthor);

        // tag
        this.router.post('/tag/create', verifyToken, checkUserRole, this.adminController.createTag);
        this.router.patch('/tag/update/:id', verifyToken, checkUserRole, this.adminController.updateTag);
        this.router.delete('/tag/delete/:id', verifyToken, checkUserRole, this.adminController.deleteTag);
    }
}

export default new AdminRoutes().router;