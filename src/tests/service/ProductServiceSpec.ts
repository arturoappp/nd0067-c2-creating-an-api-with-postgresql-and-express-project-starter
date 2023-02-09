import {ProductService} from "../../service/ProductService";
import {Product} from "../../entity/Product";
import {UtilTest} from "../UtilTest";

describe('ProductService', () => {
    let productService: ProductService;

    beforeEach(() => {
        productService = new ProductService();
    });

    describe('index', () => {
        it('should return all products', async () => {
            const result = await productService.index();
            expect(result).toBeTruthy();
        });
    });

    describe('show', () => {
        it('should return a product by id', async () => {
            const product = {name: 'Product 1', price: 100};
            const newProduct = await productService.create(product);
            const result = await productService.show(newProduct.id);
            expect(result).toEqual(newProduct);
        });

        it('should return a message if product is not found', async () => {
            const result = await productService.show(999);
            expect(result).toEqual({message: 'Product not found'});
        });
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const product = {name: UtilTest.getRandomString(), price: UtilTest.getRandomNumber()};
            const result = await productService.create(product);
            const newProduct: Product = {id: result.id, name: product.name, price: product.price};
            expect(result.name).toEqual(newProduct.name);
            expect(result.price).toEqual(newProduct.price);
            expect(result.id).toEqual(newProduct.id);
        });
    });

    describe('delete', () => {
        it('should delete a product by id', async () => {
            const result = await productService.delete(1);
            expect(result).toEqual({message: 'Product removed'});
        });

        it('should return a message if product is not found', async () => {
            const result = await productService.delete(999);
            expect(result).toEqual({message: 'Product not found'});
        });
    });
});