import request from 'supertest';
import app from '../../server';
import {UtilTest} from "../UtilTest";

const path = '/order-products';

describe('OrderProduct routes/handler', () => {
    let server: request.SuperTest<request.Test>;
    let token: string;

    beforeAll(async () => {
        server = request(app);
        const user: { username: string, lastname: string, password_digest: string } = {
            username: UtilTest.getRandomString(),
            lastname: UtilTest.getRandomString(),
            password_digest: UtilTest.getRandomString()
        };
        const response = await server.post("/users").send(user)
        token = response.body.token
    });

    it('GET /orderProducts should return a list of order products', async () => {
        const res = await server.get(path)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toEqual(200);
        expect(res.body).toBeTruthy();
    });

    it('GET /orderProducts/:id should return a single order product', async () => {
        const orderProduct = {orderId: 3, productId: 3, quantity: UtilTest.getRandomNumber()};

        const newOrderProduct = await server.post(path).send(orderProduct).set('Authorization', 'bearer ' + token)

        const res = await server.get(`${path}/${newOrderProduct.body.id}`)
            .set('Authorization', 'bearer ' + token);

        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(newOrderProduct.body.id);
    });

    it('POST /orderProducts should create a new order product', async () => {
        const orderProduct = {orderId: 3, productId: 3, quantity: UtilTest.getRandomNumber()};


        const res = await server.post(path).send(orderProduct).set('Authorization', 'bearer ' + token)

        expect(res.status).toEqual(200);
        expect(res.body).toBeTruthy()
    });

    it('DELETE /orderProducts/:id should delete an order product', async () => {
        //create one for test
        const orderProduct = {orderId: 3, productId: 3, quantity: UtilTest.getRandomNumber()};
        const result = await server.post(path).send(orderProduct).set('Authorization', 'bearer ' + token)

        const id = result.body.id;
        const res = await server.delete(`${path}/${id}`)
            .set('Authorization', 'bearer ' + token);

        expect(res.status).toEqual(200);
        expect(res.body).toEqual({message: 'Order product removed'});
    });
});
