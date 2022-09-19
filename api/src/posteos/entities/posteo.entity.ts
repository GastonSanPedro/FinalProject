import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';

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
