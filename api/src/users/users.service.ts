import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


export interface IUser {
  name:string,
  ID: string,
  userName: string,
  password: string,
  email: string,
}


@Injectable()
export class UsersService {

  users: IUser []=[
    {
      name: "Gaston",
      ID: "1",
      userName: "gaston123",
      password: "12345",
      email: "gaston@hotmail.com",
    },
    {
      name: "Alirio",
      ID: "2",
      userName: "Alopez",
      password: "1234",
      email: "alopez@hotmail.com",
    }
   ]
  
  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const userFinded:IUser= this.users.find(user=> user.ID === id)
    if(!userFinded) throw new NotFoundException(`El usuario con id ${id} no existe`)
    return userFinded;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
