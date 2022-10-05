import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { IReactions } from 'src/interfaces';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()  
  @IsDate()
  @IsOptional()
  updatedAt?: number;

  @ApiProperty()
  @IsOptional()
    likes?: IReactions[]
}
