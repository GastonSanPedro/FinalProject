import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post, PostSchema } from 'src/posteos/schema/post-schema';
import { Friend, FriendSchema } from 'src/schemas/friend-schema';
//toque el importe del posteSchema

@Schema()
export class User extends Document {
  @Prop({
    index: true,
  })
  firstName: string;

  @Prop({})
  lastName: string;

  @Prop({
    unique: true,
    index: true,
  })
  userName: string;

  @Prop({})
  password: string;

  @Prop({
    unique: true
  })
  email: string;

  @Prop({})
  image?: string; 
  
  @Prop({})
  birthDate?: string;

  
  @Prop({})
  fullName: string;
  
  @Prop({})
  bio?: string;

  //toque un poco esto nada mas dentro de la prop 
  @Prop([PostSchema]) //({})
  posts: Post[]  

  @Prop([FriendSchema])
  friends: Friend[]

}

export const UserSchema = SchemaFactory.createForClass(User);
