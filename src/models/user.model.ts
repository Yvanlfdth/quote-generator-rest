import { Schema, Model, model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    role: string;
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, required: true, default: "guest" }
}, {
    timestamps: true,
    autoCreate: true
});

export type UserModel = Model<IUser> & IUser;
export const User: UserModel = <UserModel>model<IUser>("User", userSchema);