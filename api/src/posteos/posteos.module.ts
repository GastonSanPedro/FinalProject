import { Module } from '@nestjs/common';
import { PosteosService } from './posteos.service';
import { PosteosController } from './posteos.controller';

@Module({
  controllers: [PosteosController],
  providers: [PosteosService]
})
export class PosteosModule {}
