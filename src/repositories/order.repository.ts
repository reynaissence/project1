import { AppDataSource } from "..";
import { Order } from "../models/Order";

export class OrderRepository {
    protected repository: any;

    constructor() {
        this.repository = AppDataSource.getRepository(Order);
    }

    public async insert() {}

    public async update() {}

    public async findById(orderId: string) {
        const response = await this.repository.findOneBy({id: orderId});
        return orderId;
    }

    public async findAll() {}
}