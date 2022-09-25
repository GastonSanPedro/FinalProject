import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Comment, CommentSchema } from 'src/schemas/comment-schema';

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

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    author: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post);
