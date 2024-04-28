import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from './lote.entity';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';
import { DefectoModule } from '../defectos/defecto.module';
import { EstiloModule } from '../estilos/estilo.module';
import { ClienteModule } from '../clientes/cliente.module';
import { DepartamentoModule } from '../departamentos/departamento.module';
import { AuthModule } from 'src/auth/auth.module';
import { EstiloService } from '../estilos/estilo.service';
import { DefectoService } from '../defectos/defecto.service';
import { ClienteService } from '../clientes/cliente.service';
import { DepartamentoService } from '../departamentos/departamento.service';
import { EventsGateway } from 'src/gateways/events.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lote]),
    AuthModule,
    DefectoModule,
    EstiloModule,
    ClienteModule,
    DepartamentoModule,
    EventsGateway,
  ],
  providers: [LoteService],
  controllers: [LoteController],
  exports: [LoteService], // Export LoteService if needed
})
export class LoteModule {}
