import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { CreateCommentDto } from './dto/add-comment-dto';
import { CreatePosteoDto } from './dto/create-posteo.dto';
import { UpdatePosteoDto } from './dto/update-posteo.dto';
import { PosteosService } from './posteos.service';

@ApiTags('Posteos')
@Controller('posteos')
export class PosteosController {
  constructor(private readonly posteosService: PosteosService) {}

  @Post()
  @ApiResponse({status: 201, description: 'The record has been successfully created.'})
  create(@Body() createPosteoDto: CreatePosteoDto) {
    return this.posteosService.create(createPosteoDto);
  }

  @Get()
  findAll() {
    return this.posteosService.findAll();
  }

  @Get(':term')
  findByDescription(@Param('term') term: string) {
    return this.posteosService.findByDescription(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePosteoDto: UpdatePosteoDto) {
    return this.posteosService.update(id, updatePosteoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posteosService.remove(+id);
  }

  @Post('/comment/:id')
  async addComment(
    @Param('id', ParseObjectIdPipe) id:string,
    @Body() comment: CreateCommentDto 
  ){
    return this.posteosService.addComment(id, comment)
  }

}
