import { ApiProperty } from '@nestjs/swagger';

import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';
import { Wall } from 'src/interfaces/wall-schema';
import { User } from '../schema/user-schema';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cover?: string;


  @ApiProperty()
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty()
  @IsOptional()
  friends?: User[];

  @ApiProperty()
  @IsOptional()
  followers?: User[];

  @ApiProperty()
  @IsOptional()
  reportedPosts: number

  @ApiProperty()
  @IsOptional()
  wall?: Wall[]
}
