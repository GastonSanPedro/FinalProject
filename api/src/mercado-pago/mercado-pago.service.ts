import { Injectable } from '@nestjs/common';
import { CreateMercadoPagoDto } from './dto/create-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.dto';
const mercadopago = require('mercadopago');
mercadopago.configure({
  access_token:
    'TEST-5392084165099528-100312-3ab3d506bfcb10e63fdbac4a12bf06ef-1209930610',
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
        success: 'http://localhost:3000',
        failure: 'http://localhost:3000',
        pending: 'http://localhost:3000',
      },
      auto_return: 'approved',
    };
    
    const mpUrl = await mercadopago.preferences.create(preference)
    return mpUrl.body;
  }
}
//Vendedor
// user TESTD5OG2MF1  pass 6RrOX9nz4O
// email  test_user_62162867@testuser.com
//
//Comprador
// user TESTWXWLDAZ7 pass 6x6PWZlf00
//  nombre Martinez Mirtha  DNI 01111111
