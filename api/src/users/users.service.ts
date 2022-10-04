import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user-schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';



@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel:SoftDeleteModel<User>
    // Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.userName = createUserDto.userName.toLowerCase();
    createUserDto.bio= "";
    createUserDto.fullName = `${createUserDto.firstName} ${createUserDto.lastName}`;
   
    try {
      const user:User = await this.userModel.create(createUserDto);
      return user;

    } catch (error) {  
      console.log(error);
      if(error.code === 11000){ //si consologeamos el error nos va a mostrar tanto la propiedad code, como la propiedad keyValue
        throw new BadRequestException(`User exist in db ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create User - check server logs`)
    }
  }

  async findAll() {
    return await this.userModel
    .find()
    .populate({ path: 'friends.idFriend'})
    .exec()
  }

  async findOne(term: string) {
        let userFinded:User;
        term = term.toLowerCase()

        

        //Busco por mail
        if(term.includes("@")){
          userFinded = await this.userModel
          .findOne({email : term})
          .populate({ path: 'friends.idFriend' })
          .exec()
        }


        //Busco por MongoId
        if(isValidObjectId(term)){
          userFinded =  await this.userModel
          .findById(term)
          .populate({ path: 'friends.idFriend'})
          .exec()
        }

   
        //Si no hay nada hasta este punto busco por UserName
        if(!userFinded){
          userFinded =  await this.userModel
          .findOne({userName: term})
          .populate({ path: 'friends.idFriend'})
          .exec()
        }
        //Si no encontro nada arroja error
        if (!userFinded || userFinded.isDeleted===true) throw new NotFoundException(`El usuario con el id, username or email ${term} no existe`);

        return userFinded;

  }

  async update(term: string, updateUserDto: UpdateUserDto) {
    const user:User = await this.findOne(term);
    console.log({user})
    if(updateUserDto.userName) {updateUserDto.userName = updateUserDto.userName.toLowerCase()};
    //si no lo pongo en true nunca va a ser el nuevo objeto siempre sera el old
    await user.updateOne(updateUserDto) 
    return {...user.toJSON(), ...updateUserDto};
  }

  async remove(id: string) {
    const userDelete:User = await this.userModel.findById(id);
    const deleted = await this.userModel.softDelete(userDelete)
    if(userDelete.isDeleted ===false){
    return deleted
    }else{
      return this.userModel.restore(userDelete)
    }
     
    }


  // async restaured(id:string){
  //   const userRestaured:User = await this.userModel.findById(id)
  //   const restaured = await this.userModel.restore(userRestaured)
  //   return restaured
  // }
  


  async findByName(term: string) {
    let userFinded:User[];
    //term = term.toLowerCase()
    //Busco por firstName, lastName y fullName
  
      userFinded = await this.userModel
      .find(
        {$or:[
          {firstName: {$regex: term, $options: "$i"} },
          {lastName: {$regex: term, $options: "$i"} },
          {fullName: {$regex: term, $options: "$i"} },
          {userName: {$regex: term, $options: "$i"} }
        ]})
        .populate({ path: 'friends.idFriend', select:'-posts -password -friends -email -bio'})
        .exec()
        
        if(userFinded.length === 0) throw new NotFoundException(`El usuario con el First Name, Last Name, Username or Full Name ${term} no existe`)
      return userFinded
  }



}
