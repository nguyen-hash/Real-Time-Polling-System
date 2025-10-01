import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser( username: string, password: string ) {
    const user = await this.prisma.user.findUnique({ where: {username} })

    if(user && user.passowrd === password) return user;
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign( payload )};
  }
}
