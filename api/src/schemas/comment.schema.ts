import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from 'mongoose';


export type CommentDocument = Comment & Document;

@Schema()
export class Comment {

    @Prop()
    title?: string;

    @Prop()
    likes?: number;

    @Prop()
    description: string;

    @Prop({ type: MongooseSchema.Types.String, ref: 'User' }) 
    idUser: Types.ObjectId ; 

}

export const CommentSchema = SchemaFactory.createForClass(Comment)