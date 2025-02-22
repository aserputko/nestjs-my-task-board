import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskIcon } from './task-icon.entity';
import { TaskStatus } from './task-status.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => TaskIcon, (taskIcon) => taskIcon.task)
  icon: TaskIcon;

  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.task)
  status: TaskStatus;

  // @One(() => User, (user) => user.task, { onDelete: 'CASCADE' })
  // @Column()
  @ManyToOne(() => User, (user) => user.tasks)
  createdBy: number;
}
