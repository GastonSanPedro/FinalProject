// import { Injectable } from '@nestjs/common';
// import { Socket } from 'socket.io';
// import {IConnectedClients} from '../interfaces/connectedClients.interface'

// @Injectable()
// export class MessagesWsService {
//     private connectedClients:IConnectedClients = {}

//     registerClient (client:Socket){
//         this.connectedClients[client.id] = client;
//     }
//     removeClient(clientId:string){
//         delete this.connectedClients[clientId];
//     }
//     getConnectedClients():string[]{
//         return Object.keys(this.connectedClients);
//     }
// }
