import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BlobOptions } from 'buffer';
import { Document } from 'mongoose';
import { Post, PostSchema } from 'src/posts/schema/post-schema';
import { Friend, FriendSchema } from 'src/friends/schema/friend-schema';

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

  @Prop([PostSchema]) 
  posts: Post[]  

  @Prop([FriendSchema])
  friends: Friend[]

  @Prop()
  followers: User[]

  // @Prop()
  // deleted: Boolean

}

export const UserSchema = SchemaFactory.createForClass(User);
