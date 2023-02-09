import AppDataSource from "../AppDataSource";
import {Order} from "../entity/Order";
import {User} from "../entity/User";
import {Product} from "../entity/Product";
import {OrderProduct} from "../entity/OrderProduct";

export class OrderService {
    async index() {
        try {
            const dataSource = await AppDataSource.getInstance()
            const orders = await dataSource.getRepository(Order).find();
            console.log(orders)

            return orders
        } catch (ex) {
            console.error("Error getting orders : ", ex)
        }
    }

    async show(id: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const order = await dataSource.getRepository(Order).findOneBy({id: id,})
            if (!order) {
                return {message: 'Order not found'}
            }
            return order
        } catch (ex) {
            console.error("Error getting order : ", ex)
        }
    }

    async create(userId: number) {
        try {
            const dataSource = await AppDataSource.getInstance()

            const user = await dataSource.getRepository(User).findOneBy({id: userId,})
            if (!user) {
                return {message: 'User not found'}
            }

            const order: { user: User; status: string } = {
                user: user,
                status: "active",
            }
            const newOrder = dataSource.getRepository(Order).create(order)
            await dataSource.getRepository(Order).save(newOrder)
            return newOrder
        } catch (ex) {
            console.error("Error creating order : ", ex)
        }
    }

    async delete(id: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const orderToRemove = await dataSource.getRepository(Order).findOneBy({id: id})
            if (!orderToRemove) {
                return {message: 'Order not found'}
            }
            await dataSource.getRepository(Order).remove(orderToRemove)
            return {message: 'Order removed'}
        } catch (ex) {
            console.error("Error deleting order : ", ex)
        }
    }

    async addProduct(userId: number, productId: number, quantity: number, orderId: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const order = await dataSource.getRepository(Order).findOneBy({id: orderId})
            if (!order) {
                return {message: 'Order not found'}
            }

            const product = await dataSource.getRepository(Product).findOneBy({id: productId,})
            if (!product) {
                return {message: 'product not found'}
            }

            const user = await dataSource.getRepository(User).findOneBy({id: userId})
            if (!user) {
                return {message: 'User not found'}
            }


            if (user.orders.filter(value => value.id == orderId).length == 0) {
                return {message: 'User is not the owner'}
            }

            const orderProduct = await dataSource.getRepository(OrderProduct).create({
                quantity: quantity,
                order: order,
                product: product
            })

            await dataSource.getRepository(OrderProduct).save(orderProduct)
            return await dataSource.getRepository(Order).findOneBy({id: order.id})
        } catch (ex) {
            console.error("Error creating order product: ", ex)
        }
    }

}