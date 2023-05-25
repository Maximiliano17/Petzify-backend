import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    role: string,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false,
})

userSchema.methods.encryptPassword = (password: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);