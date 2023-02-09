////@ts-nocheck
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Order} from "./Order";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    username: string;

    @Column({length: 100, nullable: false})
    lastname?: string;

    @Column({ length: 250, nullable: false })
    password_digest: string;

    @OneToMany(type => Order, order => order.user, {eager: true})
    orders?: Order[];
}
