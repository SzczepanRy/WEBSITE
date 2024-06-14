import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { EnvModule } from 'src/env/env.module';

@Module({
    imports: [EnvModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }
