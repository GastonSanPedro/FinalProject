import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export interface IUser {
  name: string;
  ID: string;
  userName: string;
  password: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  users: IUser[] = [
    {
      name: 'Gaston',
      ID: '1',
      userName: 'gaston123',
      password: '12345',
      email: 'gaston@hotmail.com',
    },
    {
      name: 'Alirio',
      ID: '2',
      userName: 'Alopez',
      password: '1234',
      email: 'alopez@hotmail.com',
    },
  ];

  async create(createUserDto: CreateUserDto) {
    const userFinded = await this.userModel;
    createUserDto.userName = createUserDto.firstName.toLowerCase();
    createUserDto.email = createUserDto.email.toLowerCase();
    const user = await this.userModel.create(createUserDto);
    return user;
    // }else{
    //   throw new BadRequestException(`El usuario con id ${createUserDto.userName} ya existe`)
    // }
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(term: string) {
    const userFinded = await this.userModel.findOne({
      $or: [
        { userName: term.toLocaleLowerCase().trim() },
        { email: term.toLocaleLowerCase().trim() },
      ],
    });

    console.log(userFinded);
    if (!userFinded)
      throw new NotFoundException(`El usuario con el nombre ${term} no existe`);

    return userFinded;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
