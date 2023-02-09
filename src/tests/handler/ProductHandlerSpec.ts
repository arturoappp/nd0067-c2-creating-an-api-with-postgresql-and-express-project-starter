import * as request from 'supertest';

import supertest from "supertest";
import {UtilTest} from "../UtilTest";
import app from "../../server";
import {Product} from "../../entity/Product";

describe('Product routes/handler', () => {
    let server: request.SuperTest<request.Test>;
    let token: string

    beforeAll(async () => {
        server = supertest(app);
        const user: { username: string, lastname: string, password_digest: string } = {
            username: UtilTest.getRandomString(),
            lastname: UtilTest.getRandomString(),
            password_digest: UtilTest.getRandomString()
        };
        const response = await server.post("/users").send(user)
        token = response.body.token
    });

    it('GET /products should return a list of products', async () => {
        const res = await server.get('/products');
        expect(res.status).toEqual(200);
        expect(res.body).toBeTruthy();
    });

    it('GET /products/:id should return a single product', async () => {
        //create to test
        const newProduct = {name: UtilTest.getRandomString(), price: 100};
        const data = await server.post('/products').send(newProduct);
        const productId = data.body.id;

        const res = await server.get(`/products/${productId}`);
        expect(res.status).toEqual(200);
        const product: Product = res.body;
        console.log(product)
        expect(product.id).toEqual(productId);
    });

    it('POST /products should create a new product', async () => {
        const product = {name: UtilTest.getRandomString(), price: 100};
        const res = await server.post('/products').send(product).set('Authorization', 'bearer ' + token);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(product.name);
    });

    it('DELETE /products/:id should delete a product', async () => {
        //create to test
        const product = {name: UtilTest.getRandomString(), price: 100};
        const productTest = (await server.post('/products').send(product).set('Authorization', 'bearer ' + token)).body as Product;

        const res = await server.delete(`/products/${productTest.id}`).set('Authorization', 'bearer ' + token);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({message: 'Product removed'});
    });

});
