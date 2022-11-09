import {Router} from "express";
import VerifyJWT from "../middlewares/token.middle.js";
import { deleteUser, editUser, loginUser, registerUser } from "../services/user.service.js";

class userRouter {

    constructor() {
        this.path = "/users";
        this.router = Router();

        this.initializeRoutes();
    }

    initializeRoutes() {
        const {router, path} = this;
        router.post(path, registerUser);
        router.post(path+"/sessions", loginUser);
        router.delete(path+"/:userId", VerifyJWT, deleteUser);
        router.put(path+"/:userId", VerifyJWT, editUser);
    }
}

export default userRouter;