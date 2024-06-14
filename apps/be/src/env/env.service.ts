import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from "./env.schema"
@Injectable()
export class EnvService {
    public constructor(private readonly configService: ConfigService) { }

    public get<T extends keyof Env>(key: T): Env[T] {
        const value = this.configService.getOrThrow(key, { infer: true }) as Env[T];

        return value
    }
}
