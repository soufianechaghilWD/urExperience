import {Router} from "express";
import VerifyJWT from "../middlewares/token.middle.js";
import { addExperience, deleteExperience, engage, getBunchOfExperiences, getExperience, updateExperience } from "../services/experience.service.js";

class experienceRouter {

    constructor() {
        this.path = "/experiences";
        this.router = Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        const {router, path} = this;
        router.post(path, VerifyJWT, addExperience).
        post(path+'/all', VerifyJWT, getBunchOfExperiences)
        .get(path+'/:experienceId', getExperience)
        .put(path+'/:experienceId', VerifyJWT, updateExperience)
        .delete(path+'/:experienceId', deleteExperience);
        router.put(path+'/engage/:experienceId', engage);

    }
}

export default experienceRouter;