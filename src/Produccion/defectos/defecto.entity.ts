// defecto.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Departamento } from '../departamentos/departamento.entity';
import { Lote } from '../lotes/lote.entity';

@Entity()
@Unique(['nombre'])
export class Defecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: 'Activo' })
  estatus: string;

  @ManyToOne(() => Departamento, (departamento) => departamento.defectos)
  departamento: Departamento;

  // Relación con Lote
  @ManyToMany(() => Lote)
  @JoinTable()
  lotes: Lote[];
}
