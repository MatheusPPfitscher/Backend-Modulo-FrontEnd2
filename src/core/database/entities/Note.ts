import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { INote } from "../../../features/note/note-contracts";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity()
export class Note implements INote {
    @PrimaryColumn({ type: 'uuid' })
    uid: string;

    @Column()
    title: string;

    @Column()
    details: string;

    @ManyToOne(type => User)
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    generateUid() {
        this.uid = uuid();
    }
}