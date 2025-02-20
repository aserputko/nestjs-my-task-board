import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTables1739997286185 implements MigrationInterface {
  name = 'TaskTables1739997286185';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "theme" character varying NOT NULL, CONSTRAINT "PK_b8747cc6a41b6cef4639babf61d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "iconId" integer, "statusId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task_icon" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_838a81ae5cdd99e815ad7a450cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_72847843225a0807f688ea0a5ad" FOREIGN KEY ("iconId") REFERENCES "task_icon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c" FOREIGN KEY ("statusId") REFERENCES "task_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(`
      INSERT INTO task_status (id, name, theme)
      VALUES
        (1, 'To Do', 'light'),
        (2, 'In Progress', 'warning'),
        (3, 'Completed', 'success'),
        (4, 'Won''t do', 'danger');
    `);

    await queryRunner.query(`
      INSERT INTO task_icon (id, name)
      VALUES
        (1, 'laptop'),
        (2, 'chat'),
        (3, 'coffee'),
        (4, 'gym');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_02068239bb8d5b2fc7f3ded618c"`);
    await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_72847843225a0807f688ea0a5ad"`);
    await queryRunner.query(`DROP TABLE "task_icon"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "task_status"`);
  }
}
