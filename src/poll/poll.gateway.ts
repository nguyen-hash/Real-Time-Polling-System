import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { PollService } from './poll.service';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class PollGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, pollId: string) {
    client.join(pollId);
    console.log(`Client ${client.id} joined room ${pollId}`);
  }



  emitPollUpdate(pollId: string, data: any) {
    this.server.to(pollId).emit('poll:update', data)
  }
}
