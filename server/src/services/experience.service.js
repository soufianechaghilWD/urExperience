import Experience from "../models/experience.model.js";

const experienceOp = new Experience();

export const addExperience = async (req, res, next) => {
    try {
        const obj = await experienceOp.createExperience(req.body);
        res.status(201).json(obj);
    } catch(e) {
        next(e);
    }
}

export const getExperience = async (req, res, next) => {
    try{
        const obj = await experienceOp.aExperience(req.params.experienceId);
        res.status(200).json(obj);
    } catch (e) {
        next(e);
    }
}