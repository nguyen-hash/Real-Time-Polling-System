import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [PrismaModule,JwtModule.register({ secret: 'SECRECT_KEY', signOptions: {expiresIn: '1H'} })],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
