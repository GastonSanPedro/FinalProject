import { Injectable } from '@nestjs/common';
import { CreatePosteoDto } from './dto/create-posteo.dto';
import { UpdatePosteoDto } from './dto/update-posteo.dto';

export interface IPost {
  ID:string,
  user_ID: string,
  pics: string,
  description: string,
  createdAt: number,
  updatedAt?:number,
}

@Injectable()
export class PosteosService {

    posteos:IPost [] = [
    {
    ID: "1234",
    user_ID: "2",
    pics: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72fpGI7YV8NGxMPIRbD_OZQ9dl6m8AcC6Cg&usqp=CAU",
    description: "esta es la imagen de nest",
    createdAt: Date.now(),
    },
    {
    ID: "12345",
    user_ID: "3",
    pics: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72fpGI7YV8NGxMPIRbD_OZQ9dl6m8AcC6Cg&usqp=CAU",
    description: "esta es otra imagen de nest",
    createdAt: Date.now(),
    },
  ]

  create(createPosteoDto: CreatePosteoDto) {
    return 'This action adds a new posteo';
  }

  findAll() {
    return this.posteos
  }

  findOne(id: string) {
    return `This action returns a #${id} posteo`;
  }

  update(id: number, updatePosteoDto: UpdatePosteoDto) {
    return `This action updates a #${id} posteo`;
  }

  remove(id: number) {
    return `This action removes a #${id} posteo`;
  }
}
