import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { DataSource, Repository } from "typeorm";
import { User } from "./models/User";
import { Product } from "./models/Product";
import { Order } from "./models/Order";
import { UserRepository } from "./repositories/user.repository";
import basicAuth from 'express-basic-auth';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123123",
    database: "prova",
    synchronize: true,
    logging: true,
    entities: [User, Product, Order],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize().catch(console.error)

const app: Application = express();
const port = 3000;
const ioc = {
    userRepository : new UserRepository()
}

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(basicAuth({
    // users: {
    //     'admin': 'supersecret',
    //     'adam': 'password1234',
    //     'eve': 'asdfghjkl',
    // }
    authorizeAsync : true, 
    authorizer: (username: string, password: string, authorize) => {
        ioc.userRepository.findByUsername(username).then(user =>  {
            authorize(null, !!user && user.password === password)
        })
    }
}))

app.get("/call1", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Messaggio1!",
    });

});

app.get("/call2", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Messaggio2!",
    });
})

app.get("/call3", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Messaggio3!",
    });
})



app.get("/user/:userId", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: req.params.userId,
    });
})

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}

