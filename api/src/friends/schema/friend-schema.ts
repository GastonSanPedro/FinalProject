import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';           
import { softDeletePlugin, SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Schema()
export class Friend extends Document {     
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  idFriend: Types.ObjectId

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  idUser: Types.ObjectId

  @Prop({type:MongooseSchema.Types.Boolean, ref:"User"})
  isDeleted:false;
}



export const FriendSchema = SchemaFactory.createForClass(Friend).plugin(softDeletePlugin);