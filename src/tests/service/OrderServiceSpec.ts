import {OrderService} from "../../service/OrderService";
import {DataSource} from "typeorm";
import {Order} from "../../entity/Order";
import AppDataSource from "../../AppDataSource";
import {User} from "../../entity/User";
import {UserService} from "../../service/UserService";
import {UtilTest} from "../UtilTest";
import {ProductService} from "../../service/ProductService";
import {Product} from "../../entity/Product";

describe('OrderService tests', () => {
    let orderService: OrderService;
    let dataSource: DataSource;
    let user: User;
    let order: Order;
    let product:Product;

    beforeEach(async () => {
        dataSource = await AppDataSource.getInstance();
        orderService = new OrderService();

        const dataUser: { username: string, lastname: string, password_digest: string } = {
            username: UtilTest.getRandomString(),
            lastname: UtilTest.getRandomString(),
            password_digest: UtilTest.getRandomString()
        };
        user = (await new UserService().create(dataUser) as User);

        order = (await orderService.create(user.id) as Order);

        product = (await new ProductService().create({
            name: UtilTest.getRandomString(),
            price: UtilTest.getRandomNumber()
        }));
    });

    it('should return all orders', async () => {
        const orders = await orderService.index();
        expect(orders).toBeTruthy();
    });

    it('should return a specific order', async () => {

        const result = await orderService.show(order.id) as Order;
        expect(result.id).toEqual(order.id);
        expect(result.status).toEqual(order.status);
    });

    it('should create an order', async () => {
        const order = await orderService.create(user.id) as Order;
        expect(order.user.id).toEqual(user.id);
        expect(order.status).toEqual('active');
    });

    it('should delete an order', async () => {
        const newOrder = await orderService.create(1);

        const result = await orderService.delete((newOrder as Order).id);
        expect(result).toEqual({message: 'Order removed'});
    });

    it('should add a product to an order', async () => {

        const myOrder = ( await orderService.addProduct(user.id, product.id, UtilTest.getRandomNumber(), order.id) as Order);
        expect(myOrder.id).toEqual(order.id);
        expect(myOrder.orderProducts.length).toBeGreaterThanOrEqual(1);
        expect(myOrder.orderProducts[0].product.id).toEqual(product.id);
    });
});
