import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    unique: true,
  })
  email: string;

  @Prop({})
  img?: string;

  @Prop({})
  birthDate?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
