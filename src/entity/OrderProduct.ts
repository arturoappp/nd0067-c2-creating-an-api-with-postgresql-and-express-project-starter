import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Order } from './Order';
import { Product } from './Product';

@Entity("order_products")
export class OrderProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: false })
    quantity: number;

    @ManyToOne(type => Order, order => order.orderProducts,)
    order: Order;

    @ManyToOne(type => Product, product => product.orderProducts,{eager: true})
    product: Product;
}