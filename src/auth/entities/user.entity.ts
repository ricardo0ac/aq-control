import { Lote } from 'src/Produccion/lotes/lote.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  nombre: string;

  @Column('text', {
    unique: true,
  })
  username: string;

  @Column('text')
  rol: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fechacreacion: Date;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column({ select: true }) // No seleccionamos esta columna por defecto
  password: string;

  @OneToMany(() => Lote, (lote) => lote.usuario) // Relación OneToMany con Lote
  lotes: Lote[];

  @OneToMany(() => Lote, (lote) => lote.usuarioActualizo) // Relación OneToMany con Lote para los lotes actualizados por este usuario
  lotesActualizados: Lote[];

  // Propiedad que almacena los lotes del usuario

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.username = this.username.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
