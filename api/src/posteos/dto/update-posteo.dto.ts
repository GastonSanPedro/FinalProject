import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate
} from 'class-validator';
import { CreatePosteoDto } from './create-posteo.dto';

export class UpdatePosteoDto extends PartialType(CreatePosteoDto) {
  @ApiProperty()  
  @IsDate()
    updatedAt?: number;
}
