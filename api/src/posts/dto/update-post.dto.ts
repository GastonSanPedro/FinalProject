import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate
} from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()  
  @IsDate()
    updatedAt?: number;
}
