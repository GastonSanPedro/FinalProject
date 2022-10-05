// import { Injectable, Body } from '@nestjs/common';
// import { Socket } from 'socket.io';
// import {IConnectedClients} from '../interfaces/connectedClients.interface'
// import { Model } from 'mongoose';
// import { UsersService } from 'src/users/users.service';
// import { User } from 'src/users/schema/user-schema';
// import { InjectModel } from '@nestjs/mongoose';

// @Injectable()
// export class MessagesWsService {
//     private connectedClients:IConnectedClients = {}
//     constructor( 
//     @InjectModel(User.name)
//     private readonly userModel:Model<User>,
//     private readonly userService: UsersService
//     ){}

//     registerClient (client:Socket ){
//         this.connectedClients[client.id] = client;
//     }
//     removeClient(clientId:string){
//         delete this.connectedClients[clientId];
//     }
//     getConnectedClients():string[]{
//         return Object.keys(this.connectedClients);
//     }
    
//     async findClient(body:any){
//     let user:User = await this.userModel.findOne({email: body})
//     return user.userName
//     }
// }
