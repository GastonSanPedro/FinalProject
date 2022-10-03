import { Injectable } from '@nestjs/common';
import { CreateMercadoPagoDto } from './dto/create-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.dto';
const mercadopago = require('mercadopago');
mercadopago.configure({
  access_token:
    'TEST-7552348907655682-092210-b3a2be080fe7a5b1032e57c80a84ef0c-339112230',
});

@Injectable()
export class MercadoPagoService {

  async create(createMercadoPagoDto: CreateMercadoPagoDto) {
    const itemsToMP = createMercadoPagoDto.products.map((item)=>{
      return {
        title: item.title,
        unit_price: Number(item.unit_price),
        quantity: Number(item.quantity),
      };
    });

    const preference ={
      payer_email: "test_user_62162867@testuser.com",
      items : itemsToMP,
      back_urls:{
        success: 'https://localhost:3000',
        failure: 'https://localhost:3000',
        pending: 'https://localhost:3000',
      },
      auto_return: 'approved',
    };
    
    const mpUrl = await mercadopago.preferences.create(preference)
    return mpUrl.body;
  }
}
