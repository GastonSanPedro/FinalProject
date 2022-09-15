import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// export interface Ipublication{

// }
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name:string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: String;

  // publications: Ipublication;
}
