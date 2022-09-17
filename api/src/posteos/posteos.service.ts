import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePosteoDto } from './dto/create-posteo.dto';
import { UpdatePosteoDto } from './dto/update-posteo.dto';
import { Posteo } from './entities/posteo.entity';

export interface IPost {
  ID: string;
  user_ID: string;
  pics: string;
  description: string;
  createdAt: number;
  updatedAt?: number;
}

@Injectable()
export class PosteosService {
  constructor(
    @InjectModel(Posteo.name)
    private readonly posteoModel: Model<Posteo>,
  ) {}

  posteos: IPost[] = [
    {
      ID: '1234',
      user_ID: '2',
      pics: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72fpGI7YV8NGxMPIRbD_OZQ9dl6m8AcC6Cg&usqp=CAU',
      description: 'esta es la imagen de nest',
      createdAt: Date.now(),
    },
    {
      ID: '12345',
      user_ID: '3',
      pics: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72fpGI7YV8NGxMPIRbD_OZQ9dl6m8AcC6Cg&usqp=CAU',
      description: 'esta es otra imagen de nest',
      createdAt: Date.now(),
    },
  ];

  async create(createPosteoDto: CreatePosteoDto) {
    createPosteoDto.description = createPosteoDto.description.toLowerCase();
    createPosteoDto.createdAt = Date.now()
    try {
      const posteo:Posteo = await this.posteoModel.create(createPosteoDto);
      return posteo;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Can't create this post - check server logs`)
    }
  }

  async findAll() {
    return await this.posteoModel.find();
  }

  async findOne(id: string) {
    return `This action returns a #${id} posteo`;
  }

  async update(id: number, updatePosteoDto: UpdatePosteoDto) {
    return `This action updates a #${id} posteo`;
  }

  async remove(id: number) {
    return `This action removes a #${id} posteo`;
  }
}
