import { AppDataSource } from "..";
import { User } from "../models/User";

export class UserRepository {
    protected repository: any;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    public async insert() {}

    public async update() {}

    public async findById(userId: string) {
        const response = await this.repository.findOneBy({id: userId});
        return userId;
    }

    public async findAll() {}
}