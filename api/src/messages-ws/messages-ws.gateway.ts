import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message-dto';
import { MessagesWsService } from './messages-ws.service';

@WebSocketGateway({ cors: '*' })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect{
  
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService
    ) {}
    
  handleConnection(client:Socket) {
    this.messagesWsService.registerClient(client)
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id)
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }
  
  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto){

    //! Emite unicamente al cliente.

    // client.emit('message-from-server',{
    //   fullname: 'Soy yo',
    //   message: payload.message || 'no-message!!!' // poner algo por default o va a tirar error
    // })

    //! Emitir a todos menos al cliente inicial (el que lo emitio)

  //   client.broadcast.emit('message-from-server',{
  //     fullname: 'Soy yo',
  //     message: payload.message || 'no-message!!!' // poner algo por default o va a tirar error
  //   })

  //  Emitir a TODOS

    this.wss.emit('message-from-server',{
      fullname: 'Soy yo',
      message: payload.message || 'no-message!!!' // poner algo por default o va a tirar error
      })

 

  // Para mandar a un usuario a una sala directamente cuando se conecta
      client.join('ventas')

  //sala x defecto a la que estan unidos los clietnes
      client.join(client.id)

  // Asigna un room al cual transmitir
      this.wss.to('ventas').emit('')

  }
}

