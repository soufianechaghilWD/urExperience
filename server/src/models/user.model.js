import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});


userSchema.pre('save', async function (next) {
    
    if(!this.isModified('password')) return next();

    const hashed = await bcrypt.hash(this.password, 10);

    this.password = hashed;

    next();
})

userSchema.methods.comparePassword = async function (candidate) {
    return await bcrypt.compare(candidate, this.password);
}

const userModel = model('User', userSchema);

export async function createUser(userData) {
    
    try{
        await userModel.create(userData);
        return {done: true, message: "user registerd"};
    }catch(e){
        throw {done: false, message: e.message || "Something went wrong"};
    }

}

export default userModel;