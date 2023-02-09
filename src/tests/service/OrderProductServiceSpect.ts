import {OrderProductService} from "../../service/OrderProductService";

describe('OrderProductService', () => {
    let orderProductService: OrderProductService;

    beforeEach(() => {
        orderProductService = new OrderProductService();
    });

    describe('index', () => {
        it('should return a list of order products', async () => {
            const result = await orderProductService.index();
            expect(Array.isArray(result)).toBeTruthy();
        });
    });

    describe('show', () => {
        it('should return a single order product', async () => {
            const result = await orderProductService.show(1);
            expect(result).toEqual(jasmine.any(Object));
        });

        it('should return "Order product not found" when order product does not exist', async () => {
            const result = await orderProductService.show(0);
            expect(result).toEqual({message: 'Order product not found'});
        });
    });

    describe('create', () => {
        it('should create a new order product', async () => {
            const result = await orderProductService.create({
                quantity: 10,
                orderId: 1,
                productId: 1
            });
            expect(result).toEqual(jasmine.any(Object));
        });
    });

    describe('delete', () => {
        it('should remove an existing order product', async () => {
            const newOrderProduct = await orderProductService.create({
                quantity: 10,
                orderId: 1,
                productId: 1
            });

            const result = await orderProductService.delete(newOrderProduct.id);
            expect(result).toEqual({message: 'Order product removed'});
        });

        it('should return "Order product not found" when order product does not exist', async () => {
            const result = await orderProductService.delete(0);
            expect(result).toEqual({message: 'Order product not found'});
        });
    });
});
