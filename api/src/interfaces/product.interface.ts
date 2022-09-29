export interface IProduct {
    // @IsString()
    // @IsNotEmpty()
    title: string

    // @IsNumber()
    // @IsNotEmpty()
    unit_price: number;

    // @IsNumber()
    // @IsNotEmpty()
    // @Max(1)
    quantity:number;
}