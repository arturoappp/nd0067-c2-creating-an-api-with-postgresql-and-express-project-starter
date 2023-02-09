import {DataSource} from "typeorm"
import dotenv from 'dotenv'
import {User} from "./entity/User";
import {Order} from "./entity/Order";
import {OrderProduct} from "./entity/OrderProduct";
import {Product} from "./entity/Product";

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_DB_TEST,
    POSTGRES_PORT_TEST,
    ENV,
} = process.env

class AppDataSource {
    private static instance: DataSource | undefined | null;

    static async getInstance(): Promise<DataSource | undefined | null> {
        if (this.instance) {
            return this.instance;
        }

        this.instance = await (async (): Promise<DataSource | undefined | null> => {
            let myDataSource: DataSource;
            if (ENV === "dev") {
                myDataSource = new DataSource({
                    type: "postgres",
                    host: POSTGRES_HOST,
                    port: parseInt(POSTGRES_PORT as string),
                    username: POSTGRES_USER,
                    password: POSTGRES_PASSWORD,
                    database: POSTGRES_DB,
                    entities: [User, Order, OrderProduct, Product],
                    logging: false,
                    synchronize: true,
                })

                try {
                    await myDataSource.initialize();
                    console.log(`Data Source  for ${ENV} has been initialized!`)
                    return myDataSource;
                } catch (ex) {
                    console.error("Error during Data Source for initialization:", ex)
                }
            } else if (ENV === "test") {
                myDataSource = new DataSource({
                    type: "postgres",
                    host: POSTGRES_HOST,
                    port: parseInt(POSTGRES_PORT_TEST as string),
                    username: POSTGRES_USER,
                    password: POSTGRES_PASSWORD,
                    database: POSTGRES_DB_TEST,
                    entities: [User, Order, OrderProduct, Product],
                    logging: false,
                    synchronize: true,
                })

                try {
                    await myDataSource.initialize();
                    console.log(`Data Source for ${ENV} has been initialized!`)
                    return myDataSource;
                } catch (ex) {
                    console.error("Error during Data Source for initialization:", ex)
                }
            }
        })();

        return this.instance;
    }
}

export default AppDataSource;
