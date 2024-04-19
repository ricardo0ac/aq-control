// lote.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Defecto } from '../defectos/defecto.entity';
import { Estilo } from '../estilos/estilo.entity';
import { Cliente } from '../clientes/cliente.entity';
import { Departamento } from '../departamentos/departamento.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Lote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lote: string;

  @Column()
  po: string;

  @Column()
  color: string;

  @Column({ default: 'Retenido' })
  estatus: string;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  fechacreacion: Date;

  @Column()
  qtyorden: number;

  @Column({ default: 0 })
  qtyrechazada: number;

  @UpdateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  fechactualizacion: Date;

  @Column({ default: 0 })
  qtyreprocesada: number;

  @ManyToMany(() => Defecto)
  @JoinTable()
  defectos: Defecto[];

  @ManyToOne(() => Estilo, (estilo) => estilo.lotes)
  estilo: Estilo;

  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @ManyToOne(() => Departamento)
  departamento: Departamento;

  @ManyToOne(() => User, (user) => user.lotes) // Relación ManyToOne con User
  usuario: User; // Propiedad que almacena al usuario

  @ManyToOne(() => User, (user) => user.lotesActualizados) // Relación ManyToOne con User para el usuario que actualiza el lote
  usuarioActualizo: User; // Propiedad que almacena al usuario
}
