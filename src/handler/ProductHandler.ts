import express, {Request, Response} from 'express'
import {ProductService} from "../service/ProductService";

const service = new ProductService()

const index = async (_req: Request, res: Response) => {
    const products = await service.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const product = await service.show(parseInt(req.params.id))
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: { name: string, price: number } = {
            name: req.body.name,
            price: req.body.price
        }
        const newProduct = await service.create(product)
        res.json(newProduct)
    } catch (err) {
        res.sendStatus(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await service.delete(parseInt(req.params.id))
    res.json(deleted)
}

const productRoutes = (app: express.Application, verifyToken: (req: express.Request, res: express.Response, next: () => void) => void) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyToken, create)
    app.delete('/products/:id', verifyToken, destroy)
}

export default productRoutes