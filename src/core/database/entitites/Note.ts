import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { INote } from "../../../features/note/note";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity()
export class Note implements INote {
    @Column()
    descricao: string;

    @Column()
    detalhamento: string;

    @ManyToOne(type => User)
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}