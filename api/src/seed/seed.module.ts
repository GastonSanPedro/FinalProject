import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from '../users/users.module';
import { PosteosModule } from 'src/posts/post.module';
import { CommentsModule } from 'src/comments/comments.module';


@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    UsersModule,
    PosteosModule,
    CommentsModule
  ]
})
export class SeedModule {}
