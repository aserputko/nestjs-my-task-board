import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTable1739867217736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS task(
          id SERIAL NOT NULL,
          name VARCHAR NOT NULL,
          description VARCHAR NOT NULL,
          "iconId" INTEGER NOT NULL,
          "statusId" INTEGER NOT NULL,
          
          PRIMARY KEY(id),
        
          CONSTRAINT fk_task_status
            FOREIGN KEY ("statusId")
            REFERENCES task_status(id)
            ON DELETE RESTRICT,

          CONSTRAINT fk_task_icon
            FOREIGN KEY ("iconId")
            REFERENCES task_icon(id)
            ON DELETE RESTRICT
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE task;       
    `);
  }
}
