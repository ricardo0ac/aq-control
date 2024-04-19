// cliente.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])], // Importa la entidad Cliente para usarla en el módulo
  controllers: [ClienteController], // Registra el controlador ClienteController en el módulo
  providers: [ClienteService], // Registra el servicio ClienteService en el módulo
  exports: [ClienteService], // Exporta el servicio ClienteService para ser usado en otros módulos si es necesario
})
export class ClienteModule {}
