import Company from "../models/company.model.js"


const companyOp = new Company();

export const addCompany = async (req, res, next) => {
    try {
        const obj = await companyOp.createCompany(req.body);
        res.status(201).json(obj);
    } catch(e) {
        next(e);
    }
}

export const getCompany = async (req, res, next) => {
    try {
        const obj = await companyOp.aCompany(req.params.companyId);
        res.status(200).json(obj);
    } catch(e) {
        next(e);
    }
}

export const updateCompany = async (req, res, next) => {
    try {
        const obj = await companyOp.editCompany(req.body);
        res.status(201).json(obj);
    } catch(e) {
        next(e);
    }
}

export const userUpdateCompany = async (req, res, next) => {
    try {
        const obj = await companyOp.editCompanyUser(req.body, req.params.companyId);
        res.status(201).json(obj);
    } catch(e) {
        next(e);
    }
}