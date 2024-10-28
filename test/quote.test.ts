import express, { Application } from "express";
import request from "supertest";
import assert from "assert";
import Server from "@src/index";
import { Quote } from '@models/quote.model';

const app: Application = express();
const server: Server = new Server(app);

describe('tests', () => {
    const randomQuotes = {
        limit: 5,
        author: "Anna-Pavlova|Albert-Camus"
    };
    it('/quotes/random', async () => {
        await request(app)
            .post(`/quotes/random`)
            .send(randomQuotes)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveLength(randomQuotes.limit);
            })
            .catch((err) => {
                assert(err === undefined);
            });
    }, 10000);

    it('/quotes/random/one', async () => {
        await request(app)
            .post(`/quotes/random/one`)
            .send(randomQuotes)
            .expect('Content-Type', /json/)
            .expect(200);
    }, 10000);
});