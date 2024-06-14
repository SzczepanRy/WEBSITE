import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_SCHEMA } from './env.schema';
import { EnvService } from './env.service';

@Module({
    imports:[
        ConfigModule.forRoot({
            validate:(env) => ENV_SCHEMA.parse(env)
        })
    ],
    providers:[EnvService],
    exports:[EnvService]
})
export class EnvModule {}
