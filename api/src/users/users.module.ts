import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from 'src/friends/schema/friend-schema';
import { Post, PostSchema } from 'src/posts/schema/post-schema';
import { User, UserSchema } from './schema/user-schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
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
        name: Friend.name,
        schema: FriendSchema,
      }
    ])
  ],
  exports:[
    MongooseModule,
  ]
})
export class UsersModule {}
