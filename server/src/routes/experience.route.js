import {Router} from "express";
import VerifyJWT from "../middlewares/token.middle.js";
import { addExperience, getExperience } from "../services/experience.service.js";

class experienceRouter {

    constructor() {
        this.path = "/experiences";
        this.router = Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        const {router, path} = this;
        router.post(path, VerifyJWT, addExperience)
        .get(path+'/:experienceId', getExperience);

    }
}

export default experienceRouter;