import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { Types } from 'mongoose';

  
export class CreatePosteoDto {

    @ApiProperty({
        description: 'User picture',
        nullable: true
    })
    @IsString()
    @IsOptional()
    pics: string;

    @ApiProperty({
    minLength: 1,
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    createdAt: number;
    
    @ApiProperty()
    @IsNotEmpty()
    author: Types.ObjectId

    @IsOptional()
    comments?: Types.ObjectId[]
}
