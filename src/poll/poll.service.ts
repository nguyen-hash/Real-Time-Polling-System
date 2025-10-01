import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PollGateway } from './poll.gateway';

@Injectable()
export class PollService {
    constructor(private prisma: PrismaService, private pollGateway: PollGateway) {}

    async vote(userId: string, pollId: string, optionId: string) {
        const existingVote = await this.prisma.vote.findFirst({ where: { userId, pollId } });
        if (existingVote) throw new BadRequestException('User has already voted.');

        await this.prisma.vote.create({ data: { userId, pollId, optionId } });

        await this.prisma.option.update({
            where: { id: optionId },
            data: { votes: { increment: 1 } },
        });

        const poll = await this.getPoll(pollId);
        this.pollGateway.emitPollUpdate(pollId, poll); // fixed typo
        
        return poll;
    }


    async getPoll(pollID: string) {
        return this.prisma.poll.findUnique({
            where: { id: pollID },
            include: { options: true }
        });
    }
}
