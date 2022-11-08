import {Router} from "express";
import { registerUser } from "../services/user.service.js";

const userRouter = Router();

userRouter.post('/users', registerUser);

export default userRouter;