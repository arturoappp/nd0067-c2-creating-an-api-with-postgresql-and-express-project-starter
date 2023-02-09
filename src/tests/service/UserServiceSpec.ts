import {UserService} from "../../service/UserService";
import {User} from "../../entity/User";
import {UtilTest} from "../UtilTest";
import {Order} from "../../entity/Order";
import {OrderService} from "../../service/OrderService";

describe('UserService', () => {
    let userService: UserService;
    let testUser: User;
    let testOrder: Order;

    beforeEach(async () => {
        userService = new UserService();

        const dataUser: { username: string, lastname: string, password_digest: string } = {
            username: UtilTest.getRandomString(),
            lastname: UtilTest.getRandomString(),
            password_digest: UtilTest.getRandomString()
        };
        testUser = (await new UserService().create(dataUser) as User);

        testOrder = (await new OrderService().create(testUser.id) as Order);
    });

    describe('index', () => {
        it('should return a list of users', async () => {
            const users = await userService.index();
            expect(Array.isArray(users)).toBeTruthy();
        });
    });

    describe('show', () => {
        it('should return a specific user by id', async () => {
            const user = await userService.show(testUser.id) as User;
            expect(user.id).toEqual(testUser.id);
            expect(user.username).toEqual(testUser.username);
        });

        it('should return a message if the user is not found', async () => {
            const result = await userService.show(-1);
            expect(result).toEqual({message: 'User not found'});
        });
    });

    describe('getOrders', () => {
        it('should return the orders for a specific user', async () => {
            const orders = await userService.getOrders(testUser.id) as Order[];
            expect(orders.length).toBeGreaterThanOrEqual(1);
        });

        it('should return a message if the user is not found', async () => {
            const result = await userService.getOrders(-1);
            expect(result).toEqual({message: 'User not found'});
        });
    });

    describe('create', () => {
            it('should create a new user', async () => {
                const newUser = {
                    username: UtilTest.getRandomString(),
                    lastname: UtilTest.getRandomString(),
                    password_digest: UtilTest.getRandomString()
                };
                const result = await userService.create(newUser) as User;
                expect(result.username).toEqual(newUser.username)
            })
        }
    )
})
