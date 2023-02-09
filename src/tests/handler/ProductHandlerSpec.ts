import * as request from 'supertest';

import supertest from "supertest";
import {UtilTest} from "../UtilTest";
import app from "../../server";
import {Product} from "../../entity/Product";

const path = "/products"
describe('Product routes/handler', () => {
    let server: request.SuperTest<request.Test>;

    beforeEach(() => {
        server = supertest(app);
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
        const res = await server.post('/products').send(product);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(product.name);
    });

    it('DELETE /products/:id should delete a product', async () => {
        //create to test
        const product = {name: UtilTest.getRandomString(), price: 100};
        const data = await server.post('/products').send(product);

        const res = await server.delete(`/products/${data.body.id}`);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({message: 'Product removed'});
    });

});
