import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskStatusSeed1739823530023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO task_status (id, name, theme)
      VALUES
        (1, 'To Do', 'light'),
        (2, 'In Progress', 'warning'),
        (3, 'Completed', 'success'),
        (4, 'Won''t do', 'danger');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM task_status;
    `);
  }
}
