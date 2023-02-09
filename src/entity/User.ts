////@ts-nocheck
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Order} from "./Order";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false, unique: true})
    username: string;

    @Column({length: 100, nullable: false})
    lastname?: string;

    @Column({ length: 250, nullable: false })
    password_digest: string;

    @OneToMany(type => Order, (order:Order) => order.user, {eager: true})
    public orders?: Order[];
}
