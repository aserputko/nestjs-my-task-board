import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
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

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;
}
