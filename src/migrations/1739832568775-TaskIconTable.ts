import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskIconTable1739832568775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS task_icon(
          id SERIAL NOT NULL,
          name VARCHAR NOT NULL,
          
          PRIMARY KEY(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE task_icon;
    `);
  }
}
