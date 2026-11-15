import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'nombre no puede contener solo espacios' })
  nombre!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio!: number;

  @IsInt()
  @Min(0)
  cantidad!: number;
}
