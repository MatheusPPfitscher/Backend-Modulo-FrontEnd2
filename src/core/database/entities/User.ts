import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../../../features/user/user-contracts";
import { Note } from "./Note";
import { sign } from "jsonwebtoken";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    userid: number;

    @Column({ length: 36 })
    username: string;

    @Column({ length: 36 })
    password: string;

    @OneToMany(type => Note, note => note.user)
    notes: Note[];

    @CreateDateColumn()
    created_at: Date;

}