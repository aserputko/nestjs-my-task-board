import * as dotenv from 'dotenv';
import { TaskTables1739997286185 } from 'src/migrations/1739997286185-TaskTables';
import { TaskIcon } from 'src/tasks/entities/task-icon.entity';
import { TaskStatus } from 'src/tasks/entities/task-status.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { DataSource } from 'typeorm';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || ''),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Task, TaskStatus, TaskIcon],
  migrations: [TaskTables1739997286185],
});
