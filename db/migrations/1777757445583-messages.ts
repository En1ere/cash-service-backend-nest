import { MigrationInterface, QueryRunner } from "typeorm";

export class Messages1777757445583 implements MigrationInterface {
    name = 'Messages1777757445583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "sentAt"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "readAt"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "forwarded" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "read_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "user_uuid" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_95358dee909ede6a0b26ce14876" FOREIGN KEY ("user_uuid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_95358dee909ede6a0b26ce14876"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "user_uuid"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "read_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "forwarded"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "deleteAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "readAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "sentAt" TIMESTAMP NOT NULL`);
    }

}
