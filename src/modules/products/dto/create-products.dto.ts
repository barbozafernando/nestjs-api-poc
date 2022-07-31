import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductsDTO {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;
}
