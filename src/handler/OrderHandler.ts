import express, {Request, Response} from 'express'
import {OrderService} from "../service/OrderService";

const service = new OrderService()

const index = async (_req: Request, res: Response) => {
    const orders = await service.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order = await service.show(parseInt(req.params.id))
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const newOrder = await service.create(parseInt(req.body.userId))
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const newOrder = await service.addProduct(parseInt(req.body.userId), parseInt(req.body.productId), parseInt(req.body.quantity), parseInt(req.params.id))
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await service.delete(parseInt(req.params.id))
    res.json(deleted)
}

const orderRoutes = (app: express.Application, verifyToken: (req: express.Request, res: express.Response, next: () => void) => void) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', verifyToken, create)
    app.delete('/orders/:id', verifyToken, destroy)
    app.post('/orders/:id', addProduct)
}

export default orderRoutes