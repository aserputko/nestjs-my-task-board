import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskStatusTable1739823530022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS task_status(
        id SERIAL NOT NULL,
        name VARCHAR NOT NULL,
        theme VARCHAR NOT NULL,
        
        PRIMARY KEY(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE task_status;
    `);
  }
}
