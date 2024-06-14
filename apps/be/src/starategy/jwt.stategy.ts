import { Injectable, Inject } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { EnvService } from 'src/env/env.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        private envService:EnvService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // secretOrKey: process.env.AUTH_KEY,
            ignoreExpiration: false,
            secretOrKey: envService.get("AUTH_KEY"),
        });
    }

    async validate(payload: { login: string }) {
        let myUser;

        let users = await this.userRepository.find();
        users.forEach((user: User) => {
            if (user.login == payload.login) {
                console.log(user);
                console.log('verrry nice');
                myUser = user;
            }
        });

        return myUser;
    }
}
