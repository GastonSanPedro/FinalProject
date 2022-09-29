import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { CreateMercadoPagoDto } from './dto/create-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.dto';

@Controller('mercadoPago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('/:postId')
  create(@Param('postId') postId:string, @Body() createMercadoPagoDto: CreateMercadoPagoDto) {
    return this.mercadoPagoService.create(createMercadoPagoDto);
  }

}
