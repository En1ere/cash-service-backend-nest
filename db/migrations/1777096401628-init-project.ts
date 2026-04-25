import { MigrationInterface, QueryRunner } from "typeorm";

export class InitProject1777096401628 implements MigrationInterface {
    name = 'InitProject1777096401628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_details" ("id" SERIAL NOT NULL, "card_number" character varying NOT NULL, "brand_name" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "current_bonuses" integer NOT NULL, "payment_methods_id" integer, CONSTRAINT "PK_309f873cfbc20f57796956a1d33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_methods" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "user_id" integer, "transaction_id" integer, CONSTRAINT "PK_34f9b8c6dfb4ac3559f7e2820d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("token" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, "user_id" integer, CONSTRAINT "PK_4542dd2f38a61354a040ba9fd57" PRIMARY KEY ("token"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "image" character varying, "link" character varying, "date" TIMESTAMP NOT NULL, "readAt" TIMESTAMP, "user_id" integer, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "sentAt" TIMESTAMP NOT NULL, "readAt" TIMESTAMP, "deleteAt" TIMESTAMP, "authorId" integer, "addresseeId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alerts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "link" character varying, "userIdId" integer, CONSTRAINT "PK_60f895662df096bfcdfab7f4b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "uuid" uuid NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "lastName" character varying, "patronymic" character varying, "avatar" character varying, "gender" character varying, "date_of_birth" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_91ba90f150e8804bdaad7b17ff8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "total" integer NOT NULL, "categoryId" integer, "transaction_id" integer, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "receipt_image" character varying NOT NULL, "totals" integer NOT NULL, "date" TIMESTAMP NOT NULL, "type" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_details" ADD CONSTRAINT "FK_36b8a6c95016e8e4281d321f7f8" FOREIGN KEY ("payment_methods_id") REFERENCES "payment_methods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_methods" ADD CONSTRAINT "FK_79ad264f003a46c7bbaf4e9f4a7" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_7a806f5e14fced276888eab1a3e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_02a7fbabeabd98d7e10ec4d34b2" FOREIGN KEY ("addresseeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alerts" ADD CONSTRAINT "FK_6eeb6a91baf4da37b3f3516a34a" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_788929ed61ab78bb914f0d1931b" FOREIGN KEY ("categoryId") REFERENCES "item_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_14d5d3b6ded57f6429f24fe9726" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_14d5d3b6ded57f6429f24fe9726"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_788929ed61ab78bb914f0d1931b"`);
        await queryRunner.query(`ALTER TABLE "alerts" DROP CONSTRAINT "FK_6eeb6a91baf4da37b3f3516a34a"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_02a7fbabeabd98d7e10ec4d34b2"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_7a806f5e14fced276888eab1a3e"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_79ad264f003a46c7bbaf4e9f4a7"`);
        await queryRunner.query(`ALTER TABLE "payment_methods" DROP CONSTRAINT "FK_d7d7fb15569674aaadcfbc0428c"`);
        await queryRunner.query(`ALTER TABLE "payment_details" DROP CONSTRAINT "FK_36b8a6c95016e8e4281d321f7f8"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "item_category"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "alerts"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "payment_methods"`);
        await queryRunner.query(`DROP TABLE "payment_details"`);
    }

}
