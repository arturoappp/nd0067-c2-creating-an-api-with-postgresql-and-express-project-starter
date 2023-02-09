import express, { Request, Response } from 'express'
import { OrderProductService } from "../service/OrderProductService";

const service = new OrderProductService()

const index = async (_req: Request, res: Response) => {
    const orderProducts = await service.index()
    res.json(orderProducts)
}

const show = async (req: Request, res: Response) => {
    const orderProduct = await service.show(parseInt(req.params.id))
    res.json(orderProduct)
}

const create = async (req: Request, res: Response) => {
    try {
        const orderProduct: { quantity: number, orderId: number, productId: number } = {
            quantity: req.body.quantity,
            orderId: req.body.orderId,
            productId: req.body.productId
        }
        const newOrderProduct = await service.create(orderProduct)
        res.json(newOrderProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await service.delete(parseInt(req.params.id))
    res.json(deleted)
}

const orderProductRoutes = (app: express.Application, verifyToken: (req: express.Request, res: express.Response, next: () => void) => void) => {
    app.get('/order-products', index)
    app.get('/order-products/:id', show)
    app.post('/order-products', verifyToken, create)
    app.delete('/order-products/:id', destroy)
}

export default orderProductRoutes
