import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../model/tasks-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  //   @ManyToOne(type => User, user => user.tasks, { eager: false })
  //   user: User;

  //   @Column()
  //   userId: number;
}
