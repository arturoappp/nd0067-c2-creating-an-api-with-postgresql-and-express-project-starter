import supertest from 'supertest';
import app from "../../server";
import AppDataSource from "../../AppDataSource";
import dotenv from "dotenv";
import {UtilTest} from "../UtilTest";


const request = supertest(app);
describe('Orders routes/handler', () => {
        let token: string;
        const path = "/orders"

        beforeAll(async function () {
            dotenv.config()
            const dataSource = await AppDataSource.getInstance();
            console.log("beforeAll" + dataSource)

            const user: { username: string, lastname: string, password_digest: string } = {
                username: UtilTest.getRandomString(),
                lastname: UtilTest.getRandomString(),
                password_digest: UtilTest.getRandomString()
            };
            const response = await request.post("/users").send(user)
            token = response.body.token
        });

        it('GET /orders should return a list of orders ', async () => {
            const response = await request.get(`${path}`);
            console.log(response.body)
            expect(response.status).toBe(200)
            expect(response.body).toBeTruthy()
        })

        it('GET /orders/:id should return a single order ', async () => {
            const id = 2
            const response = await request.get(`${path}/${id}`);
            console.log(response.body)
            expect(response.status).toBe(200)
            expect(response.body.id).toEqual(id)
        })

        it('GET /orders/:id should not return an order', async () => {
            const id = -1
            const response = await request.get(`${path}/${id}`);
            console.log(response.body)
            expect(response.body.message).toEqual("Order not found")
        })

        it('POST /orders/:id should  create order', async () => {
            const id = 3
            const response = await request.post(`${path}`)
                .set('Authorization', 'bearer ' + token).send({userId: id})
            console.log(response.body)
            expect(response.body.status).toEqual("active")
        })

        it('DELETE /orders/:id should destroy order', async () => {
            //create order
            const userId = 2
            const result = await request.post(`${path}`).send({userId: userId})
                .set('Authorization', 'bearer ' + token)
            console.log(result.body)
            const orderId = result.body.id

            const response = await request.delete(`${path}/${orderId}`)
                .set('Authorization', 'bearer ' + token)
            console.log(response.body)
            expect(response.body.message).toEqual("Order removed")
        })


        it('POST /orders/:id should add product to order', async () => {
            //create order
            const userId = 2
            const result = await request.post(`${path}`).send({userId: userId})
                .set('Authorization', 'bearer ' + token)
            console.log(result.body)
            const orderId = result.body.id


            const data: { userId: number, productId: number, quantity: number } = {
                userId: userId,
                productId: 2,
                quantity: UtilTest.getRandomNumber()
            };

            const response = await request.post(`${path}/${orderId}`).send(data)
            console.log(response.body)
            expect(response.body.id).toEqual(orderId)
            expect(response.body.orderProducts.length).toBeGreaterThanOrEqual(1)
        })
    }
);