import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    
    @ApiProperty()
    @IsDate()
    @IsOptional()
    updatedAt?: number;

    @ApiProperty()
    @IsNotEmpty()
    idComment: Types.ObjectId

}

