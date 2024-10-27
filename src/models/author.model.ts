import { Schema, Model, model, Document } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    link: string;
    bio: string;
    description: string;
}

const authorSchema = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    slug: { type: String, required: true },
    bio: String,
    description: String,
}, {
    timestamps: true,
    autoCreate: true
});

export type AuthorModel = Model<IAuthor> & IAuthor;
export const Author: AuthorModel = <AuthorModel>model<IAuthor>("Author", authorSchema);