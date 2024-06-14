import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post('/add')
  add(
    @Body() { login, password }: any,
  ): Promise<{ accesToken: string; success: boolean }> {
    return this.userService.add(login, password);
  }
  @Post('/login')
  login(
    @Body() { login, password }: any,
  ): Promise<{ accesToken?: string; message?: string; success: boolean }> {
    return this.userService.login(login, password);
  }
}
