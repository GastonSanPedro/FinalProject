import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { CreatePosteoDto } from './dto/create-posteo.dto';
import { UpdatePosteoDto } from './dto/update-posteo.dto';
import { Posteo } from './entities/posteo.entity';

@Injectable()
export class PosteosService {
  constructor(
    @InjectModel(Posteo.name)
    private readonly posteoModel: Model<Posteo>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createPosteoDto: CreatePosteoDto) {
    createPosteoDto.description = createPosteoDto.description.toLowerCase();
    createPosteoDto.createdAt = Date.now()
    try {
      const posteo:Posteo = await this.posteoModel.create(createPosteoDto);
      let user: User = await this.userModel.findById(createPosteoDto.author);
      user.posts.push(posteo)
      user.save()
      return posteo;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Can't create this post - check server logs`)
    }
  }

  async findAll() {
    return await this.posteoModel
    .find()
    .populate({ path: 'author', select: 'firstName lastName'})
    .exec();
    // .populate({ path: 'comments.idUser'})
    // .setOptions({ sanitizeFilter: true })
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

  async addComment(id:string, comment:any) {
    let post: Posteo = await this.posteoModel.findById(id);
    post.comments.push(comment)
    // post.save()
    return post
  }
  
}
