import {Router} from "express";
import VerifyJWT from "../middlewares/token.middle.js";
import { compareConfirmationCode, deleteUser, editUser, followUser, getUser, getUsersNeededData, InterestIn, loginUser, registerUser } from "../services/user.service.js";

class userRouter {

    constructor() {
        this.path = "/users";
        this.router = Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        const {router, path} = this;
        router.post(path, registerUser)
        .get(path, VerifyJWT, getUser)
        .post(path+'/data', getUsersNeededData)
        .post(path+"/confirm", compareConfirmationCode)
        .post(path+"/sessions", loginUser)
        .delete(path+"/:userId", VerifyJWT, deleteUser)
        .put(path+"/follow/:userId", VerifyJWT, followUser)
        .put(path+"/interest/:companyId", VerifyJWT, InterestIn)
        .put(path+"/:userId", VerifyJWT, editUser);
    }
}

export default userRouter;