import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';


export class CreateCommentDto {

    @IsOptional()
    title?: string;

    @IsOptional()
    likes?: number;

    @IsNotEmpty()
    description: string;
    
    @IsNotEmpty()
    idUser: ObjectId;

}