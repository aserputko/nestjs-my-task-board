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
}
