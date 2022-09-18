import { PartialType } from '@nestjs/mapped-types';
import { CreatePosteoDto } from './create-posteo.dto';
import {
    IsDate,
    IsOptional,
  } from 'class-validator';

export class UpdatePosteoDto extends PartialType(CreatePosteoDto) {
    @IsDate()
    updatedAt?: number;
}
