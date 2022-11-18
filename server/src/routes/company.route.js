import {Router} from "express";
import VerifyJWT from "../middlewares/token.middle.js";
import { addCompany, getCompany, updateCompany, userUpdateCompany } from "../services/company.service.js";

class companyRouter {

    constructor() {
        this.path = "/companies";
        this.router = Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        const {router, path} = this;
        // endpoint for the admin to add a company
        router.post(path+"/admin", addCompany)
        .put(path+"/admin", updateCompany);
        router.post(path, VerifyJWT, addCompany).
        get(path+"/:companyId", getCompany).
        put(path+"/:companyId", userUpdateCompany);
    }
}

export default companyRouter;