import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


export interface IUser {
  name:string,
  ID: string,
  userName: string,
  password: string,
  email: string,
}


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ){}

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
  
  async create(createUserDto: CreateUserDto) {
    // const userFinded = this.findOne(createUserDto.userName)
    // console.log({userFinded})
    // if(!userFinded){
    createUserDto.userName= createUserDto.name.toLowerCase()
    const user = await this.userModel.create(createUserDto)
    return user;
    // }else{
    //   throw new BadRequestException(`El usuario con id ${createUserDto.userName} ya existe`)
    // }
  }

  findAll() {
    return this.userModel.find()
  }

  findOne(userName: string) {
    // console.log({userName})
    // const userFinded= this.userModel.findOne(user=> user.userName === userName)
    // if(!userFinded) throw new NotFoundException(`El usuario con id ${userName} no existe`)
    // return userFinded;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
