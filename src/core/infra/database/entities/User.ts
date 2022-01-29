import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../../../../features/user/domain/model/user";
import { Note } from "./Note";

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
}