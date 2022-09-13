import { PartialType } from '@nestjs/mapped-types';
import { CreatePosteoDto } from './create-posteo.dto';

export class UpdatePosteoDto extends PartialType(CreatePosteoDto) {}
