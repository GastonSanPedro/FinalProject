import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import {
    IsDate,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';


  
export class AddWallCommentDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    author: ObjectId;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    createdAt: number;
}
