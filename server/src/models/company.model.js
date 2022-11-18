import { Schema, model } from "mongoose";
import _ from "lodash";

export default class Company {

    constructor() {
        const companySchema = this.createSchema();
        
        this.companyModel = model('Company', companySchema);
    } 


    createSchema() {
        return new Schema({
            name: {type: String, required: true, unique: true},
            rate: {type: Number, required: true, default: 10}, // the max is 5. 10 is to know it is the default
            companyPicCover: {type: String, required: true, default: "company.jpg"},
            companyPicProfile: {type: String, required: true, default: "companyProfile.png"},
            description: {type: String, required: true},
            countries: [{type: String}],
            roles: [{type: String}],
        });
    }

    async createCompany(companyData) {
        const {companyModel} = this;

        try {
            const {name, description} = companyData;
            const company = await companyModel.create({name, description});
            const companyDataGoThrough = _.omit(companyData, ['name', "description"]);
            console.log(companyDataGoThrough)
            Object.keys(companyDataGoThrough).forEach(element => {
                company[`${element}`].push(companyData[`${element}`]);
            }); 
            await company.save();
            return {done: true, message: "company added"};
        } catch(e) {
            let msg = null;
            if(e.keyPattern) msg = Object.keys(e.keyPattern)[0]+' already exists';
            throw {done: false, message: msg || e.message || "Something went wrong", additional: Object.keys(e.keyPattern)[0] || null};
        }

    }

    async aCompany(_id) {
        const {companyModel} = this;

        try {
            const company = await companyModel.findOne({_id});
            if(!company) throw {message: "company does not exist"};
            return {done: true, company};
        } catch(e) {
            throw { done: false, message: e.message || "Something went wrong"};
        }
    }

    async editCompany(newData) {
        const {companyModel} = this;
        try {
            const company = await companyModel.findOne({_id: newData._id});
            if(!company) throw {message: "company does not exist"};
            if(newData.countries) company.countries.push(newData.countries);
            if(newData.roles) company.roles.push(newData.roles);

            const updatedData = _.omit(newData, ['countries', "roles", "_id"]);
            Object.keys(updatedData).forEach(element => {
                company[`${element}`] = updatedData[`${element}`];
            });
            await company.save();

            return {done: true};

        } catch(e) {
            throw { done: false, message: e.message || "Something went wrong"};
        }
    }

    async editCompanyUser(newData, _id) {
        const {companyModel} = this;

        try {
            const company = await companyModel.findOne({_id});
            if(!company) throw {message: "company does not exist"};
            // update the rating
            const {rate} = newData;
            if(company.rate === 10) company.rate = rate;
            else company.rate = (company.rate + rate) / 2;

            const updatedData = _.omit(newData, ['rate']);
            Object.keys(updatedData).forEach(element => {
                company[`${element}`].push(updatedData[`${element}`]);
            });

            await company.save();

            return {done: true}

        } catch(e) {
            throw { done: false, message: e.message || "Something went wrong"};            
        }

    }

}
