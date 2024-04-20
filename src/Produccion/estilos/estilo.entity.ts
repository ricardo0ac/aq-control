import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Lote } from '../lotes/lote.entity';

@Entity()
@Unique(['nombre'])
export class Estilo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  nombre: string;

  @Column({ default: 'Activo' })
  estatus: string;

  // Relación con Lote
  @OneToMany(() => Lote, (lote) => lote.estilo)
  lotes: Lote[];
}
