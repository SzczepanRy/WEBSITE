import { Injectable, Inject, Body } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwt: JwtService,
    private envService :EnvService
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
//#######################################
  async findOne(login: string): Promise<User | undefined> {

    let users = await this.userRepository.find();
    return users.find(user => user.login=== login);
  }
  //########################################
  signToken(login: string) {
    const payload = {
      login,
    };
    const secret =  this.envService.get("AUTH_KEY")
    return this.jwt.sign(payload, {
      expiresIn: '30min',
      secret: secret,
    });
  }
  ///#############################################################

  async add(login: string, password: string) {
    const hash = await argon.hash(password);
    let newUser = new User();
    newUser.login = login;
    newUser.password = hash;
    await this.userRepository.save(newUser);
    console.log('user added');

    return {
      accesToken: this.signToken(login),
      success: true,
    };
  }

  ///#####################################################

  async login(login: string, password: string) {
    let users = await this.userRepository.find();

    let usersFound = users.filter((obj) => {
      if (obj.login == login) {
        return { login, password };
      }
    });

    if (usersFound.length != 1) {
      return { message: 'no login found', success: false };
    }

    const passwordCheck = await argon.verify(usersFound[0].password, password);
    if (passwordCheck) {
      return {
        accesToken: this.signToken(login),
        success: true,
      };
    } else {
      return {
        message: 'bad password',
        success: false,
      };
    }
  }
}
