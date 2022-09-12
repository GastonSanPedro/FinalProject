import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(10)
  email: string;

  @IsString()
  @MinLength(4)
  password: String;
}
