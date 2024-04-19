import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

// defecto.dto.ts
export class CreateDefectoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  @IsPositive()
  departamentoId: number;

  @IsOptional() // El estatus podría ser opcional en ciertos casos
  @IsString()
  estatus?: string;
}

export class UpdateDefectoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  departamentoId?: number;

  @IsOptional()
  @IsString()
  estatus?: string;
}
