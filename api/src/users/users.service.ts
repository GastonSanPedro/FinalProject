import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';



@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.userName = createUserDto.firstName.toLowerCase();
    createUserDto.bio= "";
    createUserDto.fullName = `${createUserDto.firstName} ${createUserDto.lastName}`;
    try {
      const user:User = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      if(error.code === 11000){//si consologeamos el error nos va a mostrar tanto la propiedad code, como la propiedad keyValue
        throw new BadRequestException(`User exist in db ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create User - check server logs`)
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(term: string) {
        let userFinded:User;
        term = term.toLowerCase()
        //Busco por mail
        if(term.includes("@")){
          userFinded = await this.userModel.findOne({email : term})
        }

        //Busco por MongoId
        if(isValidObjectId(term)){
          userFinded =  await this.userModel.findById(term)
        }
        //Si no hay nada hasta este punto busco por UserName
        if(!userFinded){
          userFinded =  await this.userModel.findOne({userName: term})
        }
        //Si no encontro nada arroja error
        if (!userFinded) throw new NotFoundException(`El usuario con el id, username or email ${term} no existe`);
        return userFinded;
  }

  async update(term: string, updateUserDto: UpdateUserDto) {
    const user:User = await this.findOne(term);
    console.log({user})
    if(updateUserDto.userName) {updateUserDto.userName = updateUserDto.userName.toLowerCase()};
    //si no lo pongo en true nunca va a ser el nuevo objeto siempre sera el old
    await user.updateOne(updateUserDto) 
    return {...user.toJSON(),...updateUserDto};
  }

  async remove(id: string) {
    const userDelete:User = await this.findOne(id);
    await userDelete.deleteOne()
    return `User ${id} has been deleted`;
  }

  async findByName(term: string) {
    let userFinded:User[];
    term = term.toLowerCase()
    //Busco por firstName, lastName y fullName
  
      userFinded = await this.userModel.find(
        {$or:[
          {firstName: {$regex: term, $options: "$i"} },
          {lastName: {$regex: term, $options: "$i"} },
          {fullName: {$regex: term, $options: "$i"} }
        ]})
        if(userFinded.length === 0) throw new NotFoundException(`El usuario con el First Name, Last Name or Full Name ${term} no existe`)
      return userFinded
  }

}
