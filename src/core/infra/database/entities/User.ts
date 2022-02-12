import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PASSWORD_LENGTH, USERNAME_LENGTH } from "../../../../features/user/domain/contracts/user-limits";
import { IUser } from "../../../../features/user/domain/model/user";
import { Note } from "./Note";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    userid: number;

    @Column({ length: USERNAME_LENGTH })
    username: string;

    @Column({ length: PASSWORD_LENGTH })
    password: string;

    @OneToMany(type => Note, note => note.user)
    notes: Note[];
}