import { Schema, Model, model, Document } from 'mongoose';

export interface IQuote extends Document {
    content: string;
    author: string;
    tags: string;
}

const quoteSchema = new Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    slug: { type: String, required: true },
    tags: [String]
}, {
    timestamps: true,
    autoCreate: true
});
export type QuoteModel = Model<IQuote> & IQuote;
export const Quote: QuoteModel = <QuoteModel>model<IQuote>("Quote", quoteSchema);