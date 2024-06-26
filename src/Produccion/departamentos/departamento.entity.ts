// departamento.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Defecto } from '../defectos/defecto.entity';
import { Lote } from '../lotes/lote.entity';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  nombre: string;

  @Column({ default: 'Activo' })
  estatus: string;

  @OneToMany(() => Defecto, (defecto) => defecto.departamento)
  defectos: Defecto[];

  // Relación con Lote
  @OneToMany(() => Lote, (lote) => lote.departamento)
  lotes: Lote[];
}
