import { AppDataSource } from "..";
import { User } from "../models/User";

export class UserRepository {
    protected repository: any;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    

    public async insert() {}

    public async update() {}

    public async findById(userId: number) {
        const response = await this.repository.findOneBy({id: userId});
        return userId;
    }

    public async findAll() {}

    public async findByUsername(user: string) : Promise <User> {
        const u = await this.repository.findOneBy({ username: user })
        return u
    }
}