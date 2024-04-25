import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estilo } from './estilo.entity';
import { CreateEstiloDto, UpdateEstiloDto } from './estilo.dto';

@Injectable()
export class EstiloService {
  constructor(
    @InjectRepository(Estilo)
    private readonly estiloRepository: Repository<Estilo>,
  ) {}

  async create(createEstiloDto: CreateEstiloDto): Promise<Estilo> {
    const { nombre } = createEstiloDto;
    const existingEstilo = await this.estiloRepository.findOne({
      where: { nombre },
    });
    if (existingEstilo) {
      throw new ConflictException(
        'El nombre del estilo ya existe. Por favor, elija otro nombre.',
      );
    }
    const estilo = this.estiloRepository.create(createEstiloDto);
    return await this.estiloRepository.save(estilo);
  }

  async findAll(): Promise<Estilo[]> {
    return await this.estiloRepository.find();
  }

  async findOne(id: number): Promise<Estilo> {
    const estilo = await this.estiloRepository.findOne({ where: { id } });
    if (!estilo) {
      throw new NotFoundException('Estilo no encontrado');
    }
    return estilo;
  }

  async update(id: number, updateEstiloDto: UpdateEstiloDto): Promise<Estilo> {
    const estilo = await this.findOne(id);
    this.estiloRepository.merge(estilo, updateEstiloDto);
    return await this.estiloRepository.save(estilo);
  }

  async remove(id: number): Promise<void> {
    const estilo = await this.findOne(id);
    await this.estiloRepository.remove(estilo);
  }
}
