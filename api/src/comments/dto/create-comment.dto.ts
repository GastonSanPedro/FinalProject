import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId, Types } from 'mongoose';


export class CreateCommentDto {

    @ApiProperty()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    createdAt: number

    @ApiProperty()
    @IsOptional()
    likes?: number;


    @ApiProperty()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty()
    @IsNotEmpty()
    idPost: ObjectId;

    @ApiProperty()
    @IsOptional()
    reported: boolean

  
    //probando
    @ApiProperty()
    @IsNotEmpty()
    idUser:ObjectId


}