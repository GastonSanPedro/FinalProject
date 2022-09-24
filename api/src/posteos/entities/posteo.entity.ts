import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';

@Schema()
export class Posteo  {
    @Prop({
        index:true
    })
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

export const PosteoSchema = SchemaFactory.createForClass(Posteo);
