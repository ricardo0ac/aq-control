// departamento.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Departamento } from './departamento.entity';
import {
  CreateDepartamentoDto,
  UpdateDepartamentoDto,
} from './departamento.dto';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async create(
    createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    try {
      const departamento = this.departamentoRepository.create(
        createDepartamentoDto,
      );
      return await this.departamentoRepository.save(departamento);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value')
      ) {
        throw new ConflictException(
          'El nombre del departamento ya existe. Por favor, elija otro nombre.',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Departamento[]> {
    return await this.departamentoRepository.find();
  }

  async findOne(id: number): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOne({
      where: { id },
    });
    if (!departamento) {
      throw new NotFoundException('Departamento no encontrado');
    }
    return departamento;
  }

  async update(
    id: number,
    updateDepartamentoDto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    const departamento = await this.findOne(id);
    departamento.nombre = updateDepartamentoDto.nombre;
    departamento.estatus = updateDepartamentoDto.estatus;
    return await this.departamentoRepository.save(departamento);
  }

  async remove(id: string): Promise<void> {
    await this.departamentoRepository.delete(id);
  }
}
