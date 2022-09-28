import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @ApiProperty()
    @IsDate()
    @IsOptional()
    updatedAt?: number;

    // @ApiProperty()
    // @IsDate()
    // @IsNotEmpty()
    // idComment: ObjectId

}

