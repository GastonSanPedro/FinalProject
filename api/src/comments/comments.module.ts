import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/posts/schema/post-schema';
import { User, UserSchema } from 'src/users/schema/user-schema';
import { Comment, CommentSchema } from './schema/comment-schema'


@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      }
    ])
  ],
  exports:[
    MongooseModule
  ]
})
export class CommentsModule {}
