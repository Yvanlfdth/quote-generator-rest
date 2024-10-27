import { Router } from "express";

class MiscRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/random', (req, res) => {
            res.redirect(307, '/quotes/random/one');
        });
    }
}

export default new MiscRoutes().router;