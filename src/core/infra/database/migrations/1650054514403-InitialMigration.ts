import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1650054514403 implements MigrationInterface {
    name = 'InitialMigration1650054514403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userid" SERIAL NOT NULL, "displayName" character varying(36) NOT NULL, "email" character varying(254) NOT NULL, "password" character varying(36) NOT NULL, CONSTRAINT "PK_755ac9fbd440bc9b97fe9532108" PRIMARY KEY ("userid"))`);
        await queryRunner.query(`CREATE TABLE "note" ("id" uuid NOT NULL, "title" character varying NOT NULL, "details" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userid" integer, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_e998e58b6b39e15110780c9ee29" FOREIGN KEY ("userid") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_e998e58b6b39e15110780c9ee29"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
