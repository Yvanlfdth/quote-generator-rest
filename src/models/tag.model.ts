import { Schema, Model, model, Document } from 'mongoose';

export interface ITag extends Document {
    name: string;
}

const tagSchema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true });

export type TagModel = Model<ITag> & ITag;
export const Tag: TagModel = <TagModel>model<ITag>("Tag", tagSchema);