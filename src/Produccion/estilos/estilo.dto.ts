import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEstiloDto {
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  estatus: string;
}

export class UpdateEstiloDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  estatus: string;
}
