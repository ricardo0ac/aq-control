import { Module } from '@nestjs/common';

import { DefectoModule } from './defectos/defecto.module';
import { DepartamentoModule } from './departamentos/departamento.module';
import { ClienteModule } from './clientes/cliente.module';
import { EstiloModule } from './estilos/estilo.module';
import { LoteModule } from './lotes/lote.module';

@Module({
  imports: [
    DepartamentoModule,
    DefectoModule,
    ClienteModule,
    EstiloModule,
    LoteModule,
  ],
})
export class ProduccionModule {}
