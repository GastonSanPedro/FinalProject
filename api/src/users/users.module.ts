import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posteo, PosteoSchema } from 'src/posteos/entities/posteo.entity';
import { User, UserSchema } from './entities/user.entity';
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
        name: Posteo.name,
        schema: PosteoSchema,
      }
    ])
  ],
  exports:[
    MongooseModule
  ]
})
export class UsersModule {}
