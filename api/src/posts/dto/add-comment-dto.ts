import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';


export class CreateCommentDto {

    @ApiProperty()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @IsOptional()
    likes?: number;

    @ApiProperty()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty()
    @IsNotEmpty()
    idUser: ObjectId;

}