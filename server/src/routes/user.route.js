import {Router} from "express";
import VerifyJWT from "../middlewares/token.middle.js";
import { compareConfirmationCode, deleteUser, editUser, getUser, getUsersNeededData, loginUser, registerUser } from "../services/user.service.js";

class userRouter {

    constructor() {
        this.path = "/users";
        this.router = Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        const {router, path} = this;
        router.post(path, registerUser)
        .get(path, VerifyJWT, getUser);
        router.post(path+'/data', getUsersNeededData);
        router.post(path+"/confirm", compareConfirmationCode);
        router.post(path+"/sessions", loginUser);
        router.delete(path+"/:userId", VerifyJWT, deleteUser);
        router.put(path+"/:userId", VerifyJWT, editUser);
    }
}

export default userRouter;