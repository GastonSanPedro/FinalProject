import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, ObjectId } from 'mongoose';
import { User } from 'src/users/schema/user-schema';
import { CreateCommentDto } from './dto/add-comment-dto';
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
    .populate({ path: 'comments', populate:{ path : 'idUser'} })
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

  async update(id: string, updatePostDto: UpdatePostDto) {
    updatePostDto.updatedAt = Date.now()
    const postUpdate:Post = await this.findById(id);

    let user: User = await this.userModel.findById(postUpdate.author._id);
    user.posts = user.posts.filter(post=> post._id.toString() !== id)

    await postUpdate.updateOne(updatePostDto) 
    const updatedPost:Post = await this.findById(id);

    user.posts.push(updatedPost)
    user.save()
    return `Update Successfully`;
  }

  async remove(id: string) {
    const postDelete:Post = await this.findById(id);

    let user: User = await this.userModel.findById(postDelete.author._id);
    user.posts = user.posts.filter(post=> post._id.toString() !== id)
    user.save()

    await postDelete.deleteOne()
    return `Post ${id} has been deleted`;
  }

  // // async addComment(comment:any) {
  // //   let post: Post = await this.postModel.findById(comment.idPost);
  // //   post.comments.push(comment)
  // //   post.save()
  // //   return post
  // }

  // async removeComment(ids:ICommentDelete){
  //   const postWithCommentToDelete:Post = await this.findById(ids.idPost);
  //   console.log(postWithCommentToDelete)
  // }
  
}
