import { OnModuleInit, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { 
  MessageBody, 
  OnGatewayConnection, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer ,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';
import { MessagesWsService } from './messages-ws.service';


@WebSocketGateway({ cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    ) {}

        // onModuleInit() {
        //     this.wss.on('connection', (socket) => {
        //     console.log(socket.id)
        //     console.log('Connected')
        //   })
        // }
      
        handleConnection(client:Socket) {
          console.log(client)
          this.messagesWsService.registerClient(client)
          this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
        }

        handleDisconnect(client: Socket) {
          this.messagesWsService.removeClient(client.id)
          this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
        }
        
        
        @SubscribeMessage('newUser')
          async onNewUser(@MessageBody() body: any){
          body
          const user = await this.messagesWsService.findClient(body)
           this.wss.emit(``, {
             msg: 'New Message',
             content: user
           })
        }
        // @SubscribeMessage('newMessage')
        //   onNewMessage(@MessageBody() body: any){
        //    console.log(body)
        //    this.wss.emit('onMessage', {
        //      msg: 'New Message',
        //      content: body
        //    })
        //   }
}

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

//   this.wss.emit('message-from-server',{
//     fullname: 'Soy yo',
//     message: payload.message || 'no-message!!!' // poner algo por default o va a tirar error
//     })

// // Para mandar a un usuario a una sala directamente cuando se conecta
//     client.join('ventas')

// //sala x defecto a la que estan unidos los clietnes
//     client.join(client.id)

// // Asigna un room al cual transmitir
//     this.wss.to('ventas').emit('')



// @WebSocketGateway({ cors: true})
// export class MessagesWsGateway2 implements  OnModuleInit {

//   @WebSocketServer() wss: Server;

//   onModuleInit() {
//     this.wss.on('connection', (socket) => {
//       // console.log(socket.id);
//       console.log(socket.id)
//       console.log('Connected')
//     })
//   }

//   @SubscribeMessage('newMessage')
//   onNewMessage(@MessageBody() body: any){
//    console.log(body)
//    this.wss.emit('onMessage', {
//      msg: 'New Message',
//      content: body
//    })
//   }
// }