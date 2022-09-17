import { Module } from '@nestjs/common';
import { PosteosService } from './posteos.service';
import { PosteosController } from './posteos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posteo, PosteoSchema } from './entities/posteo.entity';

@Module({
  controllers: [PosteosController],
  providers: [PosteosService],
  imports:[
    MongooseModule.forFeature([
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
export class PosteosModule {}
