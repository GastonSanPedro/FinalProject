import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './post.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiResponse({status: 201, description: 'The record has been successfully created.'})
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/term')
  findByDescription(@Body('term') term: string) {
    return this.postsService.findByDescription(term);
  }

  @Get('/id')
    findById(@Body('idPost') idPost: string){
      return this.postsService.findById(idPost)
  }

  @Patch()
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update( updatePostDto );
  }

  @Delete()
  remove(@Body('idPost') idPost: string) {
    return this.postsService.remove(idPost);
  }

  
  // @Post('/comment/:id')
  // addComment(
  //   @Param('id', ParseObjectIdPipe) id:string,
  //   @Body() comment: CreateCommentDto 
  // ){
  //   return this.postsService.addComment(id, comment)
  // }

}
