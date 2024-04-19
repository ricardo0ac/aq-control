// lote.dto.ts
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateLoteDto {
  @IsNotEmpty()
  lote: string;

  @IsNotEmpty()
  po: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  qtyorden: number;

  @IsNotEmpty()
  qtyrechazada: number;

  @IsOptional()
  qtyreprocesada: number;

  @IsNotEmpty()
  defectos: number[]; // IDs de los defectos relacionados

  @IsNotEmpty()
  estilo: number; // ID del estilo relacionado

  @IsNotEmpty()
  cliente: number; // ID del cliente relacionado

  @IsNotEmpty()
  departamento: number; // ID del departamento relacionado

  @IsNotEmpty()
  usuario: string;
}

export class UpdateLoteDto {
  @IsOptional()
  lote: string;

  @IsOptional()
  estatus: string;

  @IsOptional()
  po: string;

  @IsOptional()
  color: string;

  @IsOptional()
  qtyorden: number;

  @IsOptional()
  qtyrechazada: number;

  @IsOptional()
  qtyreprocesada: number;

  @IsOptional()
  defectos: number[]; // IDs de los defectos relacionados

  @IsOptional()
  estilo: number; // ID del estilo relacionado

  @IsOptional()
  cliente: number; // ID del cliente relacionado

  @IsOptional()
  departamento: number; // ID del departamento relacionado

  @IsOptional()
  usuarioActualizo: string;
}
