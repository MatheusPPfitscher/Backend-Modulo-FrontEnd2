import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { INote } from "../../../../features/note/domain/model/note";
import { User } from "./User";

@Entity()
export class Note implements INote {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column()
    title: string;

    @Column()
    details: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(type => User, user => user.notes)
    @JoinColumn({ name: "userid" })
    user: User;

    @BeforeInsert()
    generateid() {
        this.id = uuid();
    }
}