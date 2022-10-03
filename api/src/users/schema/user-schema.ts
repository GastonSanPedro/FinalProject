import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BlobOptions } from 'buffer';
import { Document } from 'mongoose';
import { Post, PostSchema } from 'src/posts/schema/post-schema';
import { Friend, FriendSchema } from 'src/friends/schema/friend-schema';
import { softDeletePlugin, SoftDeleteModel } from 'soft-delete-plugin-mongoose';
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

  @Prop()
  followers: User[]

  @Prop()
  isDeleted: Boolean

}

export const UserSchema = SchemaFactory.createForClass(User).plugin(softDeletePlugin);
