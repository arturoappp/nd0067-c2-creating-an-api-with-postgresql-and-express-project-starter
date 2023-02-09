import AppDataSource from "../AppDataSource";
import {User} from "../entity/User";
import bcrypt from "bcrypt";

const {
    BCRYPT_PASS,
    SALT_NUM
} = process.env

export class UserService {
    async index() {
        try {
            const dataSource = await AppDataSource.getInstance()
            const users = await dataSource.getRepository(User).find();
            console.log("users:" + users.length)
            return users
        } catch (ex) {
            console.error("Error getting users : ", ex)
        }
    }

    async show(id: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const user = await dataSource.getRepository(User).findOneBy({id: id,})
            if (!user) {
                return {message: 'User not found'}
            }
            return user
        } catch (ex) {
            console.error("Error getting user : ", ex)
        }
    }

    async getOrders(id: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const user = await dataSource.getRepository(User).findOneBy({id: id,})
            if (!user) {
                return {message: 'User not found'}
            }
            return user.orders
        } catch (ex) {
            console.error("Error getting user : ", ex)
        }
    }

    async create(user: { username: string, lastname: string, password_digest: string }) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const userFound = await dataSource.getRepository(User).findOneBy({username: user.username,})
            if (userFound) {
                console.log(userFound)
                console.log('UserName is already taken!')
                return {message: 'UserName is already taken!'}
            }

            user.password_digest = this.getHashPass(user.password_digest)

            const newUser = dataSource.getRepository(User).create(user)
            await dataSource.getRepository(User).save(newUser)
            return newUser
        } catch (ex) {
            console.error("Error creating user : ", ex)
        }
    }

    async authenticate(username: string, password: string) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const user = await dataSource.getRepository(User).findOneBy({username: username,})
            if (!user) {
                return {message: 'User not found'}
            }
            console.log(user)
            console.log(password + BCRYPT_PASS)

            if (!bcrypt.compareSync(password + BCRYPT_PASS, user.password_digest)) {
                return {message: 'User with wrong password'}
            }
            return user
        } catch (ex) {
            console.error("Error getting user : ", ex)
        }
    }

    async update(id: number, user: { username: string, password_digest: string }) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const userToUpdate = await dataSource.getRepository(User).findOneBy({id: id})
            if (!userToUpdate) {
                return {message: 'User not found'}
            }
            userToUpdate.username = user.username
            userToUpdate.password_digest = this.getHashPass(user.password_digest)

            await dataSource.getRepository(User).save(userToUpdate)
            return userToUpdate
        } catch (ex) {
            console.error("Error updating user : ", ex)
            return {message: "Error updating user : " + ex}
        }
    }

    private getHashPass(password_digest: string) {
        console.log(password_digest + BCRYPT_PASS)
        return bcrypt.hashSync(password_digest + BCRYPT_PASS, parseInt(SALT_NUM));
    }

    async delete(id: number) {
        try {
            const dataSource = await AppDataSource.getInstance()
            const userToRemove = await dataSource.getRepository(User).findOneBy({id: id})
            if (!userToRemove) {
                return {message: 'User not found'}
            }
            await dataSource.getRepository(User).remove(userToRemove)
            return {message: 'User removed'}
        } catch (ex) {
            console.error("Error deleting user : ", ex)
        }
    }

}