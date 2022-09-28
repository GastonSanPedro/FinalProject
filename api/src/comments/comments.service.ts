import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user-schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './schema/comment-schema';
import { Post } from 'src/posts/schema/post-schema';


@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly CommentModel: Model<Comment>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}

  async create( createCommentDto: CreateCommentDto) {
    createCommentDto.description =createCommentDto.description.toLowerCase();
    createCommentDto.createdAt = Date.now();
    createCommentDto.reported=false;

    try{
      const comment:Comment = await this.CommentModel.create(createCommentDto)
      let post:Post = await this.postModel.findById(createCommentDto.idPost)
      post.comments.push(comment)
      post.save()
      return comment;
    }catch(error){
      console.log(error)
        throw new InternalServerErrorException(`Can't create this post - check server logs`)
      }
    
  }


  async findAll() {
    const allComments = await this.CommentModel.find()
    console.log(allComments)
    return allComments
    // .populate({ path: 'author', select:'-posts -password -friends -email -bio'})
    // // .populate({ path: 'comments', populate:{ path : 'idUser'} })
    // // .setOptions({ sanitizeFilter: true })
    // .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
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