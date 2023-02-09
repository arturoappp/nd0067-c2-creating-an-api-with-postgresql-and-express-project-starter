import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, JoinColumn, ManyToOne} from 'typeorm';
import {OrderProduct} from './OrderProduct';
import {User} from "./User";

@Entity("orders")
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15, nullable: false})
    status: string;

    @ManyToOne(type => User, user => user.orders)
    public user: User;

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.order,{eager: true})
    orderProducts: OrderProduct[];
}