import User from "../models/user.model.js"
import jwt from "jsonwebtoken";

const userOp = new User();

export const registerUser = async (req, res, next) => {
    try {
        const obj = await userOp.createUser(req.body);
        res.status(201).json(obj);
    } catch (e) {
        next(e);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        await userOp.checkUserAndPass(req.body);
        const token = jwt.sign({ username: req.body.username }, "token", { expiresIn: "7d" });        
        res.status(200).json({token});
    } catch(e) {
        next(e);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const obj = await userOp.removeUser(req.params.userId);
        res.status(200).json(obj);
    } catch(e) {
        next(e);
    }
}

export const editUser = async (req, res, next) => {
    try {
        const obj = await userOp.updateUser(req.body.userData, req.params.userId);
        res.status(200).json(obj);
    } catch(e) {
        next(e);
    }
}

export const compareConfirmationCode = async (req, res, next) => {
    try{
        await userOp.checkConfirmationCode(req.body._id, req.body.candidate);
        const token = jwt.sign({ username: req.body.username }, "token", { expiresIn: "7d" });        
        res.status(200).json({token});
    } catch(e) {
        next(e);
    }
}