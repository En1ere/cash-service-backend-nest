import { MigrationInterface, QueryRunner } from "typeorm";

export class Blacklist1778672365322 implements MigrationInterface {
    name = 'Blacklist1778672365322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blacklist" ("id" SERIAL NOT NULL, "token" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_491806708ff1601fd3ccb2e4101" UNIQUE ("token"), CONSTRAINT "PK_04dc42a96bf0914cda31b579702" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blacklist"`);
    }

}
