import {UserService} from "../service/UserService";
import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {User} from "../entity/User";

const service = new UserService();

const index = async (_req: Request, res: Response) => {
    try {
        const users = await service.index();
        res.json(users);
    } catch (err) {
        res.sendStatus(400)
        res.json(err)
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const user = await service.show(parseInt(req.params.id));
        res.json(user);
    } catch (err) {
        res.sendStatus(400)
        res.json(err)
    }
};

const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await service.getOrders(parseInt(req.params.id));
        res.json(orders);
    } catch (err) {
        res.sendStatus(400)
        res.json(err)
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const user: { username: string, lastname: string, password_digest: string } = {
            username: req.body.username,
            lastname: req.body.lastname,
            password_digest: req.body.password
        };
        const newUser = await service.create(user)
        if (newUser instanceof User) {
            const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET);
            console.log("Creating token for user:" + newUser.id)
            res.json({token, newUser})
        } else {
            res.json(newUser)
        }
    } catch (err) {
        res.sendStatus(401);
        console.log(err)
        res.json(err);
    }
};

const authenticate = async (_req: Request, res: Response) => {
    const user: { username: string, password: string } = {
        username: _req.body.username,
        password: _req.body.password
    };
    try {
        const userAuth = await service.authenticate(user.username, user.password)

        if (userAuth instanceof User) {
            const token = jwt.sign({user: userAuth}, process.env.TOKEN_SECRET);
            console.log(userAuth)
            console.log(token)
            res.json({token, userAuth})
        } else {
            res.json(userAuth)
        }
    } catch (err) {
        res.sendStatus(401)
        res.json(err + user)
    }
}

const update = async (req: Request, res: Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password_digest: req.body.password,
    }
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const data = jwt.verify(token, process.env.TOKEN_SECRET)

        if ((<any>data).user.id !== user.id) {
            console.log('User id does not match!')
            throw new Error('User id does not match!')
        }
    } catch (err) {
        res.sendStatus(401).send('User id does not match!')
        return
    }

    try {
        const updated = await service.update(user.id, user)
        res.json(updated)
    } catch (err) {
        res.sendStatus(400)
        res.json(err + user)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await service.delete(parseInt(req.params.id));
    res.json(deleted);
};

const userRoutes = (app: express.Application, verifyToken: (req: express.Request, res: express.Response, next: () => void) => void) => {
    app.get("/users", verifyToken, index);
    app.get("/users/:id", verifyToken, show);
    app.get("/users/orders/:id", verifyToken, getOrders);
    app.post("/users", create);
    app.delete("/users/:id", verifyToken, destroy);
    app.put("/users/:id", verifyToken, update);
    app.post('/users/authenticate', authenticate);
};

export default userRoutes;