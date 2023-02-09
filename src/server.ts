import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import "reflect-metadata"
import orderRoutes from "./handler/OrderHandler";
import productRoutes from "./handler/ProductHandler";
import orderProductRoutes from "./handler/OrderProductHandler";
import userRoutes from "./handler/UserHandler";
import jwt from "jsonwebtoken";

const app: express.Application = express()
const address: string = "localhost:3000"

const verifyToken = (req: Request, res: Response, next: () => void) => {
    try {
        console.log("Verifying token:  " + req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        //console.log(data)
        console.log("Token is valid")
        next();
    } catch (ex) {
        res.send(401);
    }
}

app.use(bodyParser.json())
orderRoutes(app, verifyToken)
productRoutes(app, verifyToken)
orderProductRoutes(app, verifyToken)
userRoutes(app, verifyToken)

app.get('/', function (req: Request, res: Response) {
    res.send('Udacity Project #2 - J Arturo!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app
