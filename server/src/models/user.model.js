import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export default class User {

    constructor() {
        const userSchema = this.createSchema();
        
        userSchema.pre('save', this.setPass);
        
        userSchema.methods.comparePassword = this.comparePassword;

        this.userModel = model('User', userSchema);
    } 

    async comparePassword(candidate) {
        return await bcrypt.compare(candidate, this.password);
    }

    async setPass(next) {
        if(!this.isModified('password')) return next();
        
        const hashed = await bcrypt.hash(this.password, 10);

        this.password = hashed;
        
        next();
    }


    createSchema() {
        return new Schema({
            username: {type: String, required: true, unique: true},
            email: {type: String, required: true, unique: true},
            password: {type: String, required: true},
        });
    }

    async createUser(userData) {
        
        const {userModel} = this;

        try {
            await userModel.create(userData);
            return {done: true, message: "user registerd"};
        } catch(e) {
            let msg = null;
            if(e.keyPattern) msg = Object.keys(e.keyPattern)[0]+' already exists';
            throw {done: false, message: msg || e.message || "Something went wrong"};
        }
    
    }
    
    async checkUserAndPass(userData) {

        const {userModel} = this;

        try {
            const {username, password} = userData;
            const user = await userModel.findOne({username});
            if(!user) throw {done: false, message: "user does not exist"};
            const isPasswordRight = await user.comparePassword(password);
    
            if(isPasswordRight) return {done: true};
    
            throw {done: false, message: "wrong password"};
    
        } catch(e) {
            throw {done: false, message: e.message || "Something went wrong"};
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

}
