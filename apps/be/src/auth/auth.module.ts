import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { EnvModule } from 'src/env/env.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    EnvModule,
    JwtModule.register({
      secret:process.env.AUTH_KEY ,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService,  JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
