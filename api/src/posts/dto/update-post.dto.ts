import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate, IsOptional
} from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()  
  @IsDate()
  @IsOptional()
  updatedAt?: number;
}
