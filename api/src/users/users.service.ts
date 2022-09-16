import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersModule } from './users.module';

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
    // const userFinded = await this.userModel;
    createUserDto.userName = createUserDto.firstName.toLowerCase();
    createUserDto.email = createUserDto.email.toLowerCase();
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(term: string) {
    const userFinded = await this.userModel.findOne({
      $or: [
        { userName: term.toLocaleLowerCase().trim() },
        { email: term.toLocaleLowerCase().trim() },
        {_id:term} //esto fue lo que toque
      ],
    });
    if (!userFinded)
      throw new NotFoundException(`El usuario con el term ${term} no existe`);

    return userFinded;
  }

  async update(term: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(term);

    if(updateUserDto.userName)
      updateUserDto.userName = updateUserDto.userName.toLowerCase();
    //si no lo pongo en true nunca va a ser el nuevo objeto siempre sera el old
      await user.updateOne(updateUserDto) 

    return {...user.toJSON(),...updateUserDto};
  }

  async remove(id: string) {
    const userDelete = await this.findOne(id);
      await userDelete.deleteOne()
    return `User ${id} has been deleted`;
  }
}
