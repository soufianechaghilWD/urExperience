import { createUser } from "../models/user.model.js"

export const registerUser = async (req, res, next) => {
    try {
        const obj = await createUser(req.body);
        res.status(201).json(obj);
    } catch (e) {
        next(e);
    }
}