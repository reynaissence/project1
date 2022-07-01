import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column()
    password!: string

    @Column()
    firstName: string = ''

    @Column()
    lastName: string = ''

    @Column()
    age: number = 0
}