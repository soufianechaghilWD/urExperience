import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import _ from "lodash";

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
        const {_id, confirmed} = await userOp.checkUserAndPass(req.body);
        if(!confirmed) return res.status(200).json({confirm: true, _id});
        const token = jwt.sign({ _id }, "token", { expiresIn: "7d" });        
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
        await userOp.checkConfirmationCode(req.body._id, parseInt(req.body.candidate));
        const token = jwt.sign({ _id: req.body._id}, "token", { expiresIn: "7d" });        
        res.status(200).json({token});
    } catch(e) {
        next(e);
    }
}

export const getUser = async (req, res, next) => {
    try{
        const {user} = await userOp.findUser(req.cookies._id);
        res.status(200).json(_.omit(JSON.parse(JSON.stringify(user)), ["password", "confirmationCode"]));
    } catch(e) {
        next(e);
    }
}

export const getUsersNeededData = async (req, res, next) => {
    try {
        const obj = await userOp.usersData(req.body.ids);
        res.status(200).json(obj);
    } catch(e) {
        next(e);
    }
}

export const followUser = async (req, res, next) => {
    try {
        const obj = await userOp.addFollower(req.body._id, req.params.userId);
        res.status(200).json(obj);
    } catch(e) {
        next(e);
    }
}

export const InterestIn = async (req, res, next) => {
    try {
        const obj = await userOp.addInterest(req.body._id, req.params.companyId);
        res.status(200).json(obj);        
    } catch(e) {
        next(e);
    }
}
