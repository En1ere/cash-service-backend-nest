import { MigrationInterface, QueryRunner } from "typeorm";

export class Token1778957029387 implements MigrationInterface {
    name = 'Token1778957029387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blacklist" DROP CONSTRAINT "UQ_491806708ff1601fd3ccb2e4101"`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD "token" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD CONSTRAINT "UQ_491806708ff1601fd3ccb2e4101" UNIQUE ("token")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blacklist" DROP CONSTRAINT "UQ_491806708ff1601fd3ccb2e4101"`);
        await queryRunner.query(`ALTER TABLE "blacklist" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD "token" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blacklist" ADD CONSTRAINT "UQ_491806708ff1601fd3ccb2e4101" UNIQUE ("token")`);
    }

}
