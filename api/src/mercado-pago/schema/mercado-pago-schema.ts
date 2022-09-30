import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class MercadoPago extends Document{
    @ApiProperty()
    @Prop()
    title: string

    @ApiProperty()
    @Prop()
    unit_price: number;

    @ApiProperty()
    @Prop()
    quantity:number;
}

export const MercadoPagoSchema = SchemaFactory.createForClass(MercadoPago)
