import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";
import { IProduct } from "src/interfaces";

export class CreateMercadoPagoDto {

    @IsNotEmpty()
    products: IProduct[]
}
