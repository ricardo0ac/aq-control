// events.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer() server: Server;

  sendNotification(message: string) {
    this.server.emit('notification', message);
  }
}
