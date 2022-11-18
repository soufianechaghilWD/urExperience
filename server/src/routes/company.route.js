import {Router} from "express";
import VerifyJWT from "../middlewares/token.middle.js";

class companyRouter {

    constructor() {
        this.path = "/companies";
        this.router = Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        const {router, path} = this;
        // endpoint for the admin to add a company
        router.post(path+"/admin", );
    }
}

export default companyRouter;