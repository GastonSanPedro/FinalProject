import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { AddFriendDto } from './dto/add-friend-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({status: 201, description: 'The user has been successfully created.'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }
  @Get('/name/:term')
   findByName(@Param('term') term: string) {
  
    return this.usersService.findByName(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(term, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/friend/:id')
  async addFriend(
    @Param('id', ParseObjectIdPipe) id:string,
    @Body() friend: AddFriendDto
  ){
    return this.usersService.addFriend(id, friend)
  }

 
}
