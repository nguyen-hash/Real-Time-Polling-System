import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';

@Module({
  imports: [AuthModule, PollModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
