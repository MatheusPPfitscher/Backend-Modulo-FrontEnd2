import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EMAIL_MAX_LENGTH, PASSWORD_LENGTH, displayName_LENGTH } from "../../../../features/user/domain/contracts/user-limits";
import { IUser } from "../../../../features/user/domain/model/user";
import { Note } from "./Note";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    userid: number;

    @Column({ length: displayName_LENGTH })
    displayName: string;

    @Column({ length: EMAIL_MAX_LENGTH })
    email: string;
    
    @Column({ length: PASSWORD_LENGTH })
    password: string;

    @OneToMany(type => Note, note => note.user)
    notes: Note[];
}