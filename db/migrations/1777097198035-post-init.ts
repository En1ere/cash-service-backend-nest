import { MigrationInterface, QueryRunner } from "typeorm";

export class PostInit1777097198035 implements MigrationInterface {
    name = 'PostInit1777097198035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_of_birth" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "date_of_birth" SET NOT NULL`);
    }

}
