import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user-schema';
import { Post, PostSchema } from './schema/post-schema';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
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
    ])
  ],
  exports:[
    MongooseModule
  ]
})
export class PosteosModule {}
