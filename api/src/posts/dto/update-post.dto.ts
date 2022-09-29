import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()  
  @IsDate()
  @IsOptional()
  updatedAt?: number;

  @ApiProperty()
  @IsNotEmpty()
  idPost: Types.ObjectId
}
