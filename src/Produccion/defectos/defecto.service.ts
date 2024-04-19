// defecto.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Defecto } from './defecto.entity';
import { CreateDefectoDto, UpdateDefectoDto } from './defecto.dto';

@Injectable()
export class DefectoService {
  constructor(
    @InjectRepository(Defecto)
    private readonly defectoRepository: Repository<Defecto>,
  ) {}

  async create(createDefectoDto: CreateDefectoDto): Promise<Defecto> {
    try {
      const { departamentoId, ...rest } = createDefectoDto;
      const defecto = this.defectoRepository.create({
        ...rest,
        departamento: { id: departamentoId },
      });
      return await this.defectoRepository.save(defecto);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value')
      ) {
        throw new ConflictException(
          'El nombre del defecto ya existe. Por favor, elija otro nombre.',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Defecto[]> {
    return await this.defectoRepository.find({ relations: ['departamento'] });
  }

  async findOne(id: number): Promise<Defecto> {
    return await this.defectoRepository.findOne({
      where: { id },
      relations: ['departamento'],
    }); // Relación con departamento
  }

  async update(
    id: number,
    updateDefectoDto: UpdateDefectoDto,
  ): Promise<Defecto> {
    const defecto = await this.defectoRepository.findOne({
      where: { id },
      relations: ['departamento'],
    });

    if (!defecto) {
      throw new Error('Defecto no encontrado');
    }

    // Actualizar los campos del defecto con los valores proporcionados
    if (updateDefectoDto.nombre) {
      defecto.nombre = updateDefectoDto.nombre;
    }
    if (updateDefectoDto.departamentoId) {
      // Asegúrate de que la relación con el departamento se haya cargado correctamente
      if (!defecto.departamento) {
        throw new Error('El defecto no tiene un departamento asociado');
      }
      // Actualizar la relación con el departamento
      defecto.departamento.id = updateDefectoDto.departamentoId;
    }
    if (updateDefectoDto.estatus) {
      defecto.estatus = updateDefectoDto.estatus;
    }

    // Guardar el defecto actualizado en la base de datos
    return await this.defectoRepository.save(defecto);
  }

  async remove(id: number): Promise<void> {
    await this.defectoRepository.delete(id);
  }
}
