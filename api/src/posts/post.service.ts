import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, ObjectId } from 'mongoose';
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
    createPostDto.createdAt = Date.now();
    createPostDto.reported = false;
    createPostDto.premium = false;
    
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
    .populate({ path: 'author', select:'-posts -password -friends -email -bio'})
    .populate({ path: 'comments', populate:{ path : 'idUser', select:'-posts -password -friends -email -bio'}  })
    .setOptions({ sanitizeFilter: true })
    .exec();
  }

  async findByDescription(term: string) {

    const posts = await this.postModel
    .find({description: {$regex: term, $options: "$i"}})
    .populate({ path: 'author', select:'-posts -password -friends -email -bio'})
    .populate({ path: 'comments', populate:{ path : 'idUser'} })
    .exec();
    if (!posts) throw new NotFoundException(`Any post includes: ${term}`);
    return posts;
  }

  async findById(id: string){
    if(isValidObjectId(id)){
      const post =  await this.postModel
      .findById(id)
      .populate({ path: 'author', select:'-posts -password -friends -email -bio'})
      .populate({ path: 'comments', populate:{ path : 'idUser'} })
      .exec()
      return post
    }
  }

  async update(id:string, updatePostDto: UpdatePostDto) {
    updatePostDto.updatedAt = Date.now()
    const postUpdate:Post = await this.findById(id);

    let user: User = await this.userModel.findById(postUpdate.author._id);
    user.posts = user.posts.filter(post=> post._id.toString() !== id)

    await postUpdate.updateOne(updatePostDto) 
    const updatedPost:Post = await this.findById(id);

    user.posts.push(updatedPost)
    user.save()
    return `Update Post Successfully`;
  }

  async remove(id: string) {
    const postDelete:Post = await this.findById(id);
    let user: User = await this.userModel.findById(postDelete.author._id);
    user.posts = user.posts.filter(post=> post._id.toString() !== id)
    user.save()
    await postDelete.deleteOne()
    return `Post ${id} has been deleted`;
  }
}
