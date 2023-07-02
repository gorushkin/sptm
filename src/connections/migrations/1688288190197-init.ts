import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1688288190197 implements MigrationInterface {
    name = 'Init1688288190197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "hashPassword" character varying NOT NULL,
                "login" character varying NOT NULL,
                CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cart" (
                "id" SERIAL NOT NULL,
                "quantity" integer NOT NULL,
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_383757ebefdbf81c7a59589655" ON "cart" ("userId", "bookId")
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "content" character varying NOT NULL,
                "author" character varying NOT NULL,
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "store" (
                "id" SERIAL NOT NULL,
                "quantity" integer NOT NULL,
                "bookId" integer,
                CONSTRAINT "REL_f91ffb69e46c73085d6aeb1305" UNIQUE ("bookId"),
                CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_15605eba0be4c6669389090dd15" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "store"
            ADD CONSTRAINT "FK_f91ffb69e46c73085d6aeb13055" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "store" DROP CONSTRAINT "FK_f91ffb69e46c73085d6aeb13055"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_15605eba0be4c6669389090dd15"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"
        `);
        await queryRunner.query(`
            DROP TABLE "store"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_383757ebefdbf81c7a59589655"
        `);
        await queryRunner.query(`
            DROP TABLE "cart"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
