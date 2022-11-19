import { Schema, model } from "mongoose";
import _ from "lodash";

export default class Experience {

    constructor() {
        const experienceSchema = this.createSchema();
        
        this.experienceModel = model('Experience', experienceSchema);
    } 


    createSchema() {
        return new Schema({
            author: {type: String, required: true},
            company: {type: String, required: true},
            role: {type: String, required: true},
            country: {type: String, required: true},
            remote: {type: Boolean, default: false},
            seniority: {type: String, required: true, enum: ['intern', 'junior', 'mid-level', 'senior']},
            rate: {type: Number, required: true},
            agreed: [{type: String, required: true, default: 0}],
            disagreed: [{type: String, required: true, default: 0}],
            feedback: {type: String, required: true}
        });
    }

    async createExperience(experienceData) {

        const {experienceModel} = this;

        try {

            const { rate, agreed, disagreed, feedback, ...coreInfos } = experienceData;

            const checkExperience = await experienceModel.findOne(coreInfos);
            if(checkExperience !== null) throw {message: "experience already exists"};

            await experienceModel.create(experienceData);
            return {done: true, message: "exeperience added"};
        } catch(e) {
            throw {message: e.message};
        }
    }

    async aExperience(_id) {

        const {experienceModel} = this;
        
        try {
            const experience = await experienceModel.findOne({_id});
            if(!experience) throw {message: "experience does not exist"};

            return {experience};
        } catch(e) {
            throw {message: e.message};
        }
    }
    

}
