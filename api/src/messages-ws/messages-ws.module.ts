// import { Module } from '@nestjs/common';
// // import { MessagesWsService } from './messages-ws.service';
// // import { MessagesWsGateway } from './messages-ws.gateway';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from 'src/users/schema/user-schema';
// import { Comment, CommentSchema } from 'src/comments/schema/comment-schema';
// import { Post, PostSchema } from 'src/posts/schema/post-schema';
// import { UsersModule } from 'src/users/users.module';
// import { UsersService } from 'src/users/users.service';


// @Module({
//   providers: [MessagesWsGateway, MessagesWsService, UsersService],
//   imports:[
//     MongooseModule.forFeature([
//     {
//       name: Post.name,
//       schema: PostSchema,
//     },
//     {
//       name: User.name,
//       schema: UserSchema,
//     },
//     {
//       name: Comment.name,
//       schema: CommentSchema,
//     }
//   ]),
//   ],
// })
// export class MessagesWsModule {}
