import supertest from 'supertest';
import app from "../server";

const apiPath = "/"

const request = supertest(app);
describe('Test Api home endpoint responses', () => {
        it('Test home patch return 200', async () => {
            const response = await request.get(`${apiPath}`);
            console.log(response.body)
            expect(response.status).toBe(200);
        })

        it('Returns 404 for invalid endpoint', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/somewhere');
            expect(response.status).toBe(404);
        })
    }
);