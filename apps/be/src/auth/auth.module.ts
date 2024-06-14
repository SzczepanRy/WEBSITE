import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService,  JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
