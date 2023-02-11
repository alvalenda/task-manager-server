import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../model/tasks-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @ManyToOne((type) => User, (user) => user.tasks, {
    eager: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
  // eager = false, because we don't want to load the user when we load the task

  @Column()
  userId: number;
}
