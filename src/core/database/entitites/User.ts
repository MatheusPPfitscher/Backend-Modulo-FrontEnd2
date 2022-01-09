import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { INote } from "../../../features/note/note";
import { IUser } from "../../../features/user/user";
import { Note } from "./Note";

@Entity()
export class User implements IUser {
    @PrimaryColumn({ length: 35 })
    username: string;

    @Column({ length: 35 })
    password: string;

    @Column()
    token: string;

    @OneToMany(type => Note, note => note.user)
    notes: INote[];

    @CreateDateColumn()
    created_at: Date;
}