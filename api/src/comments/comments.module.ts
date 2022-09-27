import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentSchema } from './schema/comment-schema';
import { Post, PostSchema } from 'src/posts/schema/post-schema';
import { User, UserSchema } from 'src/users/schema/user-schema';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ])
  ],
  exports: [
    MongooseModule
  ]
})
export class CommentsModule {}
