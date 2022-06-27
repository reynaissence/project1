import "reflect-metadata";
import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hello finf!",
    });

});

app.get("/negev", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hneger!",
    });
})

app.get("/gay", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "frocio!",
    });
})

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}