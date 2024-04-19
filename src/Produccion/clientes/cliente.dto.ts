import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  estatus: string;
}

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  estatus: string;
}
