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
  userModel: any;
  constructor(
    @InjectModel(Posteo.name)
    private readonly posteoModel: Model<Posteo>,
  ) {}

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

  async findByDescription(term: string) {
    term = term.toLowerCase()
    const posteos:Posteo [] = await this.posteoModel.find({description: {$regex: term, $options: "$i"} })
    if (!posteos) throw new NotFoundException(`No existe ningun posteo que contenga ${term}`);
    return posteos;
  }

  async update(id: string, updatePosteoDto: UpdatePosteoDto) {
    return `This action updates a #${id} posteo`;
  }

  async remove(id: number) {
    return `This action removes a #${id} posteo`;
  }
  
}
