import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {OrderProduct} from "./OrderProduct";

@Entity("products")
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 64, nullable: false})
    name: string;

    @Column({type: 'integer', nullable: false})
    price: number;

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.product)
    orderProducts?: OrderProduct[];
}