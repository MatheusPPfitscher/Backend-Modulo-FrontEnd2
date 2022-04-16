import {MigrationInterface, QueryRunner} from "typeorm";

export class TestsMigration1650049390296 implements MigrationInterface {
    name = 'TestsMigration1650049390296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userid" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "displayName" varchar(36) NOT NULL, "email" varchar(254) NOT NULL, "password" varchar(36) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "note" ("uid" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "details" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userid" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_note" ("uid" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "details" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userid" integer, CONSTRAINT "FK_e998e58b6b39e15110780c9ee29" FOREIGN KEY ("userid") REFERENCES "user" ("userid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_note"("uid", "title", "details", "created_at", "userid") SELECT "uid", "title", "details", "created_at", "userid" FROM "note"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`ALTER TABLE "temporary_note" RENAME TO "note"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME TO "temporary_note"`);
        await queryRunner.query(`CREATE TABLE "note" ("uid" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "details" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "userid" integer)`);
        await queryRunner.query(`INSERT INTO "note"("uid", "title", "details", "created_at", "userid") SELECT "uid", "title", "details", "created_at", "userid" FROM "temporary_note"`);
        await queryRunner.query(`DROP TABLE "temporary_note"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
