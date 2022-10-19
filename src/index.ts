import "reflect-metadata";
import * as express from "express";
import { Application, Request, Response } from "express";
import { UserRepository } from "./repositories/user.repository";
import * as basicAuth from 'express-basic-auth';
import { AppDataSource } from "./data-source"
import { ProductRepository } from "./repositories/product.repository";
import { Product } from "./models/Product";
import { v4 as uuidv4 } from 'uuid';

AppDataSource.initialize().then(async () => {
    
    const app: Application = express();
    const port = 3000;
    const ioc = {
        userRepository : new UserRepository(),
        productRepository : new ProductRepository()
    }

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(basicAuth({
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

    app.get("/orders", async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Crea un prodotto!",
        });
    })

    app.get("/products", async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Inserisci prodotto!",
        });
    })

    //INSERT PRODUCTS 

    app.post("/products", async (req: Request, res: Response) => {
       
        
        if (!req.body.name) {
            res.status(400).send({ message: 'Serve un nome'})
        }

        const product = { 
            name : req.body.name,
            description : req.body.description,
            guid : uuidv4(),
            price : req.body.price
        } as Product;

        const newProduct = ioc.productRepository.insert( product )
        
        res.status(201).send(newProduct)
    })

    app.get("/users/:userId", async (req: Request, res: Response): Promise<Response> => {
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

}).catch(error => console.log(error))



