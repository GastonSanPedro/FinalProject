import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId, Types } from 'mongoose';


export class CreateCommentDto {

    @ApiProperty()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @IsOptional()
    likes?: number;
    
    @ApiProperty()
    @IsOptional()
    @IsDate()
    createdAt?: number
    
    @ApiProperty()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty()
    @IsOptional()
    reported: boolean
    
    @ApiProperty()
    @IsNotEmpty()
    idPost: ObjectId;

    @ApiProperty()
    @IsNotEmpty()
    idUser:ObjectId

}