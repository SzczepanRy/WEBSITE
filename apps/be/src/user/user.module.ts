import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { EnvModule } from 'src/env/env.module';

@Module({
  imports: [DatabaseModule , EnvModule],
  controllers: [UserController],
  providers: [...userProviders, UserService, JwtService],
    exports :[UserService]
})
export class UserModule {}
