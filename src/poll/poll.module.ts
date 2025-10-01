import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollGateway } from './poll.gateway';
import { PrismaModule } from 'prisma/prisma.module';
import { PollController } from './poll.controller';

@Module({
  imports: [PrismaModule],
  providers: [PollGateway, PollService],
  controllers: [PollController]
})
export class PollModule {}
