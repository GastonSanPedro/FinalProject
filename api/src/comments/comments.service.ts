import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  create( createCommentDto: CreateCommentDto) {
  createCommentDto.createdAt = Date.now();
  createPostDto.reported = false;
    return 'This action adds a new comment';
  }



    
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


  findAll() {
    return `This action returns all comments`;
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