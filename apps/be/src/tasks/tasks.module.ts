import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { TasksController } from './tasks.controller';
import { userProviders } from 'src/user/user.providers';
import { tasksProviders } from './tasks.providers';
import { TasksService } from './tasks.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports:[DatabaseModule, AuthModule],
    controllers:[TasksController],
    providers:[...userProviders, ...tasksProviders , TasksService],
    exports:[TasksService]
})
export class TasksModule {}
