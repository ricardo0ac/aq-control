import { IsEmpty, IsOptional, IsString, isEmpty } from 'class-validator';

// departamento.dto.ts
export class CreateDepartamentoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  estatus: string;
}

export class UpdateDepartamentoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  estatus: string;
}
