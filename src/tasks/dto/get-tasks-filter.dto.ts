import { TaskStatus } from '../entities/tasks.entity';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
