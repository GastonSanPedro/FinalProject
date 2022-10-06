import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';


@Schema()
export class Wall extends Document  {

    @Prop()
    description: string;

    @Prop()
    createdAt: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    author: Types.ObjectId

}

export const WallSchema = SchemaFactory.createForClass(Wall);
