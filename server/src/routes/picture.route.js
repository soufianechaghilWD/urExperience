import {Router} from "express";
import VerifyJWT from "../middlewares/token.middle.js";
import addPic from "../services/picture.service.js";

class picRouter {

    constructor() {
        this.path = "/pictures";
        this.router = Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        const {router, path} = this;
        router.post(path, VerifyJWT, addPic);
    }
}

export default picRouter;