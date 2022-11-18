import { Schema, model } from "mongoose";

export default class Company {

    constructor() {
        const companySchema = this.createSchema();
        
        this.companyModel = model('Company', companySchema);
    } 


    createSchema() {
        return new Schema({
            name: {type: String, required: true, unique: true},
            rate: {type: Number, required: true, default: 10}, // the max is 5. 10 is to know it is the default
            companyPic: {type: String, required: true, default: ""},
            roles: [{type: String}]
        });
    }

}
