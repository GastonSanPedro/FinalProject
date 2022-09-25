import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/users/schema/user-schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schema/post-schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    createPostDto.description = createPostDto.description.toLowerCase();
    createPostDto.createdAt = Date.now()
    try {
      const post:Post = await this.postModel.create(createPostDto);
      let user: User = await this.userModel.findById(createPostDto.author);
      user.posts.push(post)
      user.save()
      return post;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Can't create this post - check server logs`)
    }
  }

  async findAll() {
    return await this.postModel
    .find()
    .populate({ path: 'author', select: 'firstName lastName'})
    .populate({ path: 'comments'})
    .setOptions({ sanitizeFilter: true })
    .exec();
  }

  async findByDescription(term: string) {       // esta ruta rompe

    const posts:Post[] = await this.postModel
    .find({description: {$regex: term, $options: "$i"}  })
    .populate({ path: 'author', select: 'firstName lastName'})
    .populate({ path: 'comments'})
    .setOptions({ sanitizeFilter: true })
    .exec();

    if (!posts) throw new NotFoundException(`No post includes: ${term}`);
    return posts;
  }

  async findById(id: string){
    if(isValidObjectId(id)){
      const post =  await this.postModel
      .findById(id)
      .populate({ path: 'author', select: 'firstName lastName'})
      .populate({ path: 'comments'})
      .setOptions({ sanitizeFilter: true })
      .exec()
      return post
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    updatePostDto.updatedAt = Date.now()
    const post:Post = await this.findById(id);
    await post.updateOne(updatePostDto) 
    return {...post.toJSON(), ...updatePostDto};
  }

  async remove(id: string) {
    const postDelete:Post = await this.findById(id);
    await postDelete.deleteOne()
    return `Post ${id} has been deleted`;
  }

  async addComment(id:string, comment:any) {
    let post: Post = await this.postModel.findById(id);
    post.comments.push(comment)
    post.save()
    return post
  }

  
}
