import AppDataSource from "../AppDataSource";
import {Product} from "../entity/Product";

export class ProductService {
    async index() {
        try {
            const dataSource = await AppDataSource.getInstance()
            const products = await dataSource.getRepository(Product).find();
            return products
        } catch (ex) {
            console.error("Error getting products : ", ex)
        }
    }

    async show(id: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const product = await dataSource.getRepository(Product).findOneBy({id: id,})
            if (!product) {
                return { message: 'Product not found' }
            }
            return product
        } catch (ex) {
            console.error("Error getting product : ", ex)
        }
    }

    async create(product: { name: string, price: number }) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const newProduct = dataSource.getRepository(Product).create(product)
            await dataSource.getRepository(Product).save(newProduct)
            return newProduct
        } catch (ex) {
            console.error("Error creating product : ", ex)
        }
    }

    async delete(id: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const productToRemove = await dataSource.getRepository(Product).findOneBy({id:id})
            if (!productToRemove) {
                return { message: 'Product not found' }
            }
            await dataSource.getRepository(Product).remove(productToRemove)
            return { message: 'Product removed' }
        } catch (ex) {
            console.error("Error deleting product : ", ex)
        }
    }
}