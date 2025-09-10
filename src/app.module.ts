import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MeetingsModule } from './meetings/meetings.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'teamsync',
      password: 'secret',
      database: 'teamsync',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ dev only
    }),
    UsersModule,
    MeetingsModule,
    TasksModule,
  ],
})
export class AppModule {}
