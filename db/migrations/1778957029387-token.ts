import { MigrationInterface, QueryRunner } from 'typeorm'

export class Token1778957029387 implements MigrationInterface {
    name = 'Token1778957029387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "blacklist"
                ALTER COLUMN "token" TYPE text
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "blacklist"
                ALTER COLUMN "token" TYPE character varying(255)
        `)
    }
}