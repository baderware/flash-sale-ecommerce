import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique:true})
    name:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    address:string;
}
