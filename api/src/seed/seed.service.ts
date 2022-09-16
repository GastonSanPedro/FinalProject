import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios'
import { Model } from 'mongoose';

import { User } from 'src/users/entities/user.entity';
import { UserResponse } from '../seed/interfaces/user-response.interface';


import { usersDB } from './users';

@Injectable()
export class SeedService {

   private readonly axios: AxiosInstance=axios;

   constructor(

    @InjectModel( User.name )
    private readonly userModel: Model<User>){}

    async populateDB(){
      await this.userModel.deleteMany({});

      // const { data } = await this.axios.get<UserResponse>('http://localhost:3005/users');

      // const usersToInsert: {
      //    firstName: string;
      //    lastName:  string;
      //    userName:  string;
      //    email:     string;
      //    password:  string;
      //    image:     string;
      //    birthdate: string;
      // }[] = []

      // data.users.forEach(({ firstName, lastName, userName, email, password, image, birthdate }) => {

      // usersToInsert.push({ firstName, lastName, userName, email, password, image, birthdate })  
      // });
      

      const usersToInsert: {
         firstName: string;
         lastName:  string;
         userName:  string;
         email:     string;
         password:  string;
         image:     string;
         birthdate: string;
      }[] = []

      usersDB.forEach(({ firstName, lastName, userName, email, password, image, birthdate }) => {

      usersToInsert.push({ firstName, lastName, userName, email, password, image, birthdate })  
      });
   await this.userModel.insertMany(usersToInsert)
   
   return 'SEED executed'
}
}
