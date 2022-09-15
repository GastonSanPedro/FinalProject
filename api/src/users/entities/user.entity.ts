import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document{

    @Prop({
        unique: true,
        index:true
    })
    name:string;

    @Prop({
        unique: true,
        index:true,
        
    })
    userName: string;

    
    password: string;

    @Prop({
        unique: true,
    })
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User)