import AppDataSource from "../AppDataSource";
import {OrderProduct} from "../entity/OrderProduct";
import {Order} from "../entity/Order";
import {Product} from "../entity/Product";

export class OrderProductService {
    async index() {
        try {
            const dataSource = await AppDataSource.getInstance()
            const orderProducts = await dataSource.getRepository(OrderProduct).find();
            console.log(orderProducts)
            return orderProducts
        } catch (ex) {
            console.error("Error getting order products: ", ex)
        }
    }

    async show(id: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const orderProduct = await dataSource.getRepository(OrderProduct).findOneBy({id: id})
            if (!orderProduct) {
                return {message: 'Order product not found'}
            }
            return orderProduct
        } catch (ex) {
            console.error("Error getting order product: ", ex)
        }
    }

    async create(orderProduct: { quantity: number; orderId: number; productId: number }) {
        try {
            const dataSource = await AppDataSource.getInstance()

            const order = await dataSource.getRepository(Order).findOneBy({id: orderProduct.orderId})
            const product = await dataSource.getRepository(Product).findOneBy({id: orderProduct.productId,})

            const newOrderProduct = dataSource.getRepository(OrderProduct).create({
                quantity: orderProduct.quantity,
                order: order,
                product: product
            })
            await dataSource.getRepository(OrderProduct).save(newOrderProduct)
            return newOrderProduct
        } catch (ex) {
            console.error("Error creating order product: ", ex)
        }
    }

    async delete(id: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const orderProductToRemove = await dataSource.getRepository(OrderProduct).findOneBy({id: id})
            if (!orderProductToRemove) {
                return {message: 'Order product not found'}
            }
            await dataSource.getRepository(OrderProduct).remove(orderProductToRemove)
            return {message: 'Order product removed'}
        } catch (ex) {
            console.error("Error deleting order product: ", ex)
        }
    }
}
