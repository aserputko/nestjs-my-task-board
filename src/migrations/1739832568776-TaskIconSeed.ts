import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskIconSeed1739832568776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`
      DELETE FROM task_icon;
    `);
  }
}
