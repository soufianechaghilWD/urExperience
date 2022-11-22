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
    try {
        const obj = await experienceOp.aExperience(req.params.experienceId);
        res.status(200).json(obj);
    } catch (e) {
        next(e);
    }
}

export const updateExperience = async (req, res, next) => {
    try {
        const obj = await experienceOp.editExperience(req.params.experienceId, req.body.userId, req.body.data);
        res.status(201).json(obj);
    } catch(e) {
        next(e);
    }
}

export const deleteExperience = async (req, res, next) => {
    try {
        const obj = await experienceOp.removeExperience(req.params.experienceId, req.body.userId);
        res.status(200).json(obj);
    } catch(e) {
        next(e);
    }
}

export const engage = async (req, res, next) => {
    try {
        const obj = await experienceOp.enageWithExperience(req.params.experienceId, req.body.operation, req.body.userId);
        res.status(200).json(obj);
    } catch(e) {
        next(e);
    }
}