import * as request from 'supertest';

import supertest from "supertest";
import {UtilTest} from "../UtilTest";
import app from "../../server";
import {User} from "../../entity/User";

describe('User routes/handler', () => {
    let server: request.SuperTest<request.Test>;
    let token: string
    let userIdToUpdate: number
    const path = "/users"

    beforeAll(async () => {
        server = supertest(app);
        const user: { username: string, lastname: string, password_digest: string } = {
            username: UtilTest.getRandomString(),
            lastname: UtilTest.getRandomString(),
            password_digest: UtilTest.getRandomString()
        };
        const response = await server.post("/users").send(user)
        token = response.body.token
        userIdToUpdate = response.body.newUser.id
    });

    it('GET /users should return a list of users', async () => {
        const res = await server.get('/users').set('Authorization', 'bearer ' + token);
        expect(res.status).toEqual(200);
        expect(res.body).toBeTruthy();
    });

    it('GET /users/:id should return a single user', async () => {
        const res = await server.get('/users/1').set('Authorization', 'bearer ' + token);
        expect(res.status).toEqual(200);
        const user: User = res.body;
        expect(user.id).toEqual(1);
    });

    it('POST /users should create a new user', async () => {
        const user = {username: UtilTest.getRandomString(), password: 'password', lastname: UtilTest.getRandomString()};
        const res = await server.post('/users').send(user);
        expect(res.status).toEqual(200);
        expect(res.body.newUser.username).toEqual(user.username);
    });

    it('PUT /users/:id should update a user', async () => {
        const user = {username: UtilTest.getRandomString(), password: 'password', lastname: UtilTest.getRandomString()};
        const res = await server.put('/users/' + userIdToUpdate).send(user).set('Authorization', 'bearer ' + token);
        expect(res.status).toEqual(200);
        expect(res.body.username).toEqual(user.username);
    });

    it('DELETE /users/:id should delete a user', async () => {
        //create user to delete
        const user: { username: string, lastname: string, password_digest: string } = {
            username: UtilTest.getRandomString(),
            lastname: UtilTest.getRandomString(),
            password_digest: UtilTest.getRandomString()
        };
        const response = await server.post("/users").send(user)
        const userId = response.body.newUser.id

        const res = await server.delete('/users/' + userId).set('Authorization', 'bearer ' + token);
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('User removed');
    });
});