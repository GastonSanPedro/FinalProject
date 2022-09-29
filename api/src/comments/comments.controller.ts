import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';



@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiResponse({status:201,description:'The record has been successfully created.'})
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('/id')
  findById(@Body('idComment') idComment: string) {
    return this.commentsService.findById(idComment);
  }

  @Patch()
  update(@Body() updateCommentDto: UpdateCommentDto ) {
    return this.commentsService.update(updateCommentDto);
  }

  @Delete()
  remove(@Body('idComment') idComment: string) {
    return this.commentsService.remove(idComment);
  }
}
