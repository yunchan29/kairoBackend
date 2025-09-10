// data-source.ts
import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Task } from './src/tasks/task.entity';
import { Meeting } from './src/meetings/meeting.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'teamsync',
  password: 'secret',
  database: 'teamsync',
  synchronize: false, // migrations will handle schema changes
  logging: true,
  entities: [User, Task, Meeting],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
