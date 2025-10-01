import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { PollService } from "./poll.service";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('polls')
export class PollController {
  constructor(private pollService: PollService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':pollId/vote')
  async vote(@Req() req: any, @Param('pollId') pollId: string, @Body('optionId') optionId: string) {
    return this.pollService.vote(req.user.id, pollId, optionId)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':pollId')
  async getPoll(@Param('pollId') pollId: string) {
    return this.pollService.getPoll(pollId);
  }
}