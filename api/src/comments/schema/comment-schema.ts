import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class Comment extends Document {

    @Prop()
    title?: string;

    @Prop()
    likes?: number;

    @Prop()
    description: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post' }) 
    idPost: Types.ObjectId ; 

    @Prop()
    reported: boolean

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)