import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PromiseProvider } from 'mongoose';
import { Iposteos } from 'src/seed/interfaces/user-response.interface';

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
  posteos?: Iposteos[]

  @Prop({})
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
