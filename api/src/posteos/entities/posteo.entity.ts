import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Posteo extends Document{
    @Prop({
        index:true
    })
    description: string;

    @Prop({})
    pics: string;

    @Prop({})
    createdAt: Date;
}

export const PosteoSchema = SchemaFactory.createForClass(Posteo);
