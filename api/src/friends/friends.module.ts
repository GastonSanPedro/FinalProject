import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user-schema';
import { Post, PostSchema } from 'src/posts/schema/post-schema';
import { Friend, FriendSchema } from './schema/friend-schema';
import { Comment, CommentSchema } from 'src/comments/schema/comment-schema';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
  imports:[
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
      {
        name: Friend.name,
        schema: FriendSchema,
      }
    ])
  ],
  exports:[
    MongooseModule
  ]
})
export class FriendsModule {}
