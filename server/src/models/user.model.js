import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import randomCode from "../utils/random.js";

export default class User {

    constructor() {
        const userSchema = this.createSchema();
        
        userSchema.pre('save', this.setPassAndConfirmationCode);
        
        userSchema.methods.comparePassword = this.comparePassword;
        userSchema.methods.compareConfirmationCode = this.compareConfirmationCode;

        this.userModel = model('User', userSchema);
    } 

    compareConfirmationCode (candidate) {
        return candidate === this.confirmationCode;
    }

    async comparePassword(candidate) {
        return await bcrypt.compare(candidate, this.password);
    }

    async setPassAndConfirmationCode(next) {
        if(!this.isModified('password')) return next();
        
        const hashed = await bcrypt.hash(this.password, 10);
        const confirmationCode = randomCode();

        this.password = hashed;
        this.confirmationCode = confirmationCode;

        next();
    }


    createSchema() {
        return new Schema({
            username: {type: String, required: true, unique: true},
            email: {type: String, required: true, unique: true},
            password: {type: String, required: true},
            confirmationCode: {type: Number, required: true, default: 0},
            confirmed: {type: Boolean, required: true, default: false},
            profilePic: {type: String, required: true, default: "user.png"},
            bio: {type: String}
        });
    }

    async createUser(userData) {
        
        const {userModel} = this;

        try {
            const user = await userModel.create(userData);
            return {_id: user._id, done: true, message: "user registerd"};
        } catch(e) {
            let msg = null;
            if(e.keyPattern) msg = Object.keys(e.keyPattern)[0]+' already exists';
            throw {done: false, message: msg || e.message || "Something went wrong", additional: Object.keys(e.keyPattern)[0] || null};
        }
    
    }
    
    async checkConfirmationCode (_id, candidate) {

        const  { userModel }= this

        try {
            const user = await userModel.findOne({_id});
            if(!user) throw {done: false, message: "user does not exist"};
            if(user.confirmed) throw {done: false, message: 'user already confirmed'};

            const isCandidateCorrect = user.compareConfirmationCode(candidate);
            if(!isCandidateCorrect) throw { done: false, message: "Confirmation code is wrong" };

            await userModel.updateOne({_id}, {confirmed: true});
            return { done: true, message: "user confirmed"};

        } catch(e) {
            throw { done: false, message: e.message || "Something went wrong"}
        }
    }

    async checkUserAndPass(userData) {

        const {userModel} = this;

        try {
            const {username, password} = userData;
            const user = await userModel.findOne({username});
            if(!user) throw {message: "user does not exist", additional: "username"};
            const isPasswordRight = await user.comparePassword(password);
    
            if(isPasswordRight) return {done: true, _id: user._id, confirmed: user.confirmed};
    
            throw {message: "wrong password", additional: "password"};
    
        } catch(e) {
            throw {message: e.message || "Something went wrong", additional: e.additional || null};
        }
    }
    
    async removeUser(userId) {

        const {userModel} = this;

        try {
            await userModel.deleteOne({_id: userId});
    
            return {done: true, message: "user deleted"};
        } catch(e) {
            throw {done: false, message: e.message || "Something went wrong"};
        }
    }
    
    async updateUser(userData, _id) {

        const {userModel} = this;

        try{
            if(userData?.email) throw {status: 400, message: "Could not edit the email"};
            if(userData.password) userData.password = await bcrypt.hash(userData.password, 10);
            const userupdated = await userModel.updateOne({_id}, userData);
    
            if(userupdated.acknowledged) return {done: true, message: "user data edited"};
    
            throw {message: "Could not update user data"};
            
        } catch(e) {
            let msg = null;
            if(e.keyPattern) msg = Object.keys(e.keyPattern)[0] + " already exists";
            throw {done: false, message: msg || e.message || "Something went wrong"};
        }
    }

    async findUser(_id) {
        const { userModel } = this;

        try {
            const user = await userModel.findOne({_id});

            return {done: true, user};
        } catch(e) {
            throw {done: false, message: e.message || "something went wrong"};
        }

    }

}
