import { TaskStatus } from '../entities/tasks.entity';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
