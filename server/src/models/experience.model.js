import { Schema, model, Types } from "mongoose";
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
            feedback: {type: String, required: true},
            addedAt: {type: Date, required: true, default: new Date()}
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
    
    async editExperience(experience_id, user_id, data) {

        const {experienceModel} = this;

        try {
            const experience = await experienceModel.findOne({_id: experience_id});
            if(!experience) throw {message: "experience does not exist"};
            const {author, company, agreed, disagreed, ...editableData} = data;
            if(experience.author !== user_id) throw {message: "you can only edit your experiences"};


            Object.keys(editableData).forEach(element => {
                experience[`${element}`] = editableData[`${element}`];
            });
            await experience.save();
            return {done: true};
        } catch (e) {
            throw {message: e.message};
        }
    }

    async removeExperience(_id, author) {
        
        const {experienceModel} = this; 
    
        try {
            const experience = await experienceModel.findOne({_id});
            if(!experience) throw {message: "experience does not exist"};
            if(experience.author !== author) throw {message: "you can only delete your experiences"};

            await experienceModel.deleteOne({_id});

            return {done: true};

        } catch(e) {
            throw {message: e.message};
        }

    }

    async enageWithExperience(_id, operation, engager) {

        const {experienceModel} = this; 

        try {
            const experience = await experienceModel.findOne({_id});
            if(!experience) throw {message: "experience does not exist"};

            const userAgreed = experience.agreed.some(ele => ele === engager);
            const userDisagreed = experience.disagreed.some(ele => ele === engager);

            if(operation === "agree") {
                if(userAgreed || userDisagreed) throw {message: "user already engaged"};
                experience.agreed.push(engager);
            } else if(operation === "unagree") {
                if(!userAgreed) throw {message: "user not agreed"};
                const idx = experience.agreed.indexOf(engager);
                experience.agreed.splice(idx, 1);
            } else if(operation === "disagree") {
                if(userAgreed || userDisagreed) throw {message: "user already engaged"};
                experience.disagreed.push(engager);
            } else if(operation === "undisagree") {
                if(!userDisagreed) throw {message: "user not disagreed"};
                const idx = experience.disagreed.indexOf(engager);
                experience.disagreed.splice(idx, 1);
            }

            await experience.save();
            return {done: true};
        } catch(e) {
            throw {message: e.message};            
        }
    }


    async getExperiences(ids) {

        const {experienceModel} = this;
        console.log(ids)
        try {
            const experiences = await experienceModel.find({author: {$in: ids.map(id => Types.ObjectId(id))}});
            return {done: true, experiences};
        } catch (e){
            throw {message: e.message};
        }

    }
}
