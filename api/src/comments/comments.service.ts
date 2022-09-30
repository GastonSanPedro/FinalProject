import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/users/schema/user-schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './schema/comment-schema';
import { Post } from 'src/posts/schema/post-schema';


@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}

  async create( createCommentDto: CreateCommentDto) {
    createCommentDto.description = createCommentDto.description.toLowerCase();
    createCommentDto.createdAt = Date.now();
    createCommentDto.reported = false;

    try{
      const comment:Comment = await this.commentModel.create(createCommentDto)
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
    const allComments = await this.commentModel.find()
    return allComments
    // // .populate({ path: 'comments', populate:{ path : 'idUser'} })
    // // .setOptions({ sanitizeFilter: true })
    // .exec();
  }

  async findById(idComment: string) {
    if(!isValidObjectId(idComment)) throw new BadRequestException(`Id is not an MongoId`)
      const comment =  await this.commentModel.findById(idComment)
      return comment
  }

  async update(id: string , updateCommentDto: UpdateCommentDto) {
    updateCommentDto.updatedAt = Date.now();
    const commentUpdate:Comment = await this.findById(id);

    let post: Post = await this.postModel.findById(commentUpdate.idPost);
    post.comments = post.comments.filter(post=> post._id.toString() !== id)

    await commentUpdate.updateOne(updateCommentDto)
    const updatedComment:Comment = await this.findById(id)

    post.comments.push(updatedComment)
    post.save()

    return `Updated Comment succesfully`
  
  }

  async remove(idComment: string) {
    const commentDelete:Comment = await this.findById(idComment);
    let post:Post = await this.postModel.findById(commentDelete.idPost)
    post.comments = post.comments.filter(comment=> comment._id.toString() !== idComment)
    post.save()
    await commentDelete.deleteOne()
    return `Comment ${idComment} has been deleted`;
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