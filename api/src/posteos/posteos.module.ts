import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Posteo, PosteoSchema } from './entities/posteo.entity';
import { PosteosController } from './posteos.controller';
import { PosteosService } from './posteos.service';

@Module({
  controllers: [PosteosController],
  providers: [PosteosService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Posteo.name,
        schema: PosteoSchema,
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
