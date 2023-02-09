import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/entities/tasks.entity';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // implement name column with default value "" (empty string)
  @Column({ default: '' })
  name: string;

  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
  // eager = true, because we want to load the tasks when we load the user (we want to see the tasks of the user)

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
