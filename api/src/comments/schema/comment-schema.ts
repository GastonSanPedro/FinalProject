import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { IReactions } from "src/interfaces";

@Schema()
export class Comment extends Document {

    @Prop()
    title?: string;

    @Prop()
    likes?: IReactions[];

    @Prop()
    description: string;
    
    @Prop()
    reported: boolean
    
    @Prop()
    createdAt: Date;
    
    @Prop()
    updatedAt?: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post' }) 
    idPost: Types.ObjectId ; 

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) 
    idUser: Types.ObjectId ; 
}

export const CommentSchema = SchemaFactory.createForClass(Comment)