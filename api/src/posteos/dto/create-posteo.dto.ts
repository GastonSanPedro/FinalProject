import {
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
  } from 'class-validator';
export class CreatePosteoDto {
    @IsString()
    pics: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    @IsOptional()
    createdAt: number;
    
}
