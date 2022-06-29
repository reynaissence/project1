import { AppDataSource } from "..";
import { Product } from "../models/Product";

export class ProductRepository {
    protected repository: any;

    constructor() {
        this.repository = AppDataSource.getRepository(Product);
    }

    public async insert() {}

    public async update() {}

    public async findById(productId: string) {
        const response = await this.repository.findOneBy({id: productId});
        return productId;
    }

    public async findAll() {}
}