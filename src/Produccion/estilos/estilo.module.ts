import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estilo } from './estilo.entity';
import { EstiloController } from './estilo.controller';
import { EstiloService } from './estilo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estilo])], // Importa la entidad Estilo para usarla en el módulo
  controllers: [EstiloController], // Registra el controlador EstiloController en el módulo
  providers: [EstiloService], // Registra el servicio EstiloService en el módulo
  exports: [EstiloService], // Exporta el servicio EstiloService para ser usado en otros módulos si es necesario
})
export class EstiloModule {}
