import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Comment, CommentSchema } from '../../comments/schema/comment-schema'

@Schema()
export class Post extends Document  {
    @Prop({
        index:true
    })

    @Prop()
    description: string;

    @Prop()
    pics: string;

    @Prop()
    createdAt: Date;

    @Prop([CommentSchema])  
    comments: Comment[]
    
    @Prop()
    updatedAt: Date;
    
    @Prop()
    reported: boolean;

    @Prop()
    premium: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    author: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post);
