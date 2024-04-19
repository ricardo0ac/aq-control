import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefectoController } from './defecto.controller';
import { DefectoService } from './defecto.service';
import { Defecto } from './defecto.entity';
import { Departamento } from '../departamentos/departamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Defecto, Departamento])],
  controllers: [DefectoController],
  providers: [DefectoService],
  exports: [DefectoService], // Si necesitas usar el servicio en otros módulos
})
export class DefectoModule {}
