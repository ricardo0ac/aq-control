import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Lote } from '../lotes/lote.entity';

@Entity()
@Unique(['nombre'])
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  nombre: string;

  @Column({
    default: 'Activo',
    type: 'varchar',
  })
  estatus: string;

  @OneToMany(() => Lote, (lote) => lote.cliente)
  lotes: Lote[];
}
