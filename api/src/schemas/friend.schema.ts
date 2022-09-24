import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type FriendDocument = Friend & Document ;            

@Schema()
export class Friend{     
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
  idFriend: Types.ObjectId
}

export const FriendSchema = SchemaFactory.createForClass(Friend)