import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from './lote.entity';
import { CreateLoteDto, UpdateLoteDto } from './lote.dto';
import { DefectoService } from '../defectos/defecto.service';
import { plainToClass } from 'class-transformer';
import { EstiloService } from '../estilos/estilo.service';
import { ClienteService } from '../clientes/cliente.service';
import { DepartamentoService } from '../departamentos/departamento.service';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
// Importa el servicio de defectos

@Injectable()
export class LoteService {
  constructor(
    @InjectRepository(Lote) private readonly loteRepository: Repository<Lote>,
    private readonly defectoService: DefectoService,
    private readonly estiloService: EstiloService,
    private readonly clienteService: ClienteService,
    private readonly usuarioService: AuthService,
    private readonly departamentoService: DepartamentoService, // Inyecta el servicio de defectos
  ) {}

  async create(createLoteDto: CreateLoteDto): Promise<Lote> {
    const lote = new Lote();
    lote.lote = createLoteDto.lote;
    lote.po = createLoteDto.po;
    lote.color = createLoteDto.color;
    lote.fechacreacion = new Date();
    lote.qtyorden = createLoteDto.qtyorden;
    lote.qtyrechazada = createLoteDto.qtyrechazada;
    lote.qtyreprocesada = createLoteDto.qtyreprocesada;
    // lote.usuario = user;

    // Recupera los objetos Defecto por ID
    const defectos = await Promise.all(
      createLoteDto.defectos.map(async (defectoId) => {
        return await this.defectoService.findOne(defectoId);
      }),
    );

    lote.defectos = defectos; // Asigna los objetos Defecto al lote

    // Asigna el estilo
    const estilo = await this.estiloService.findOne(createLoteDto.estilo);
    lote.estilo = estilo;

    const usuario = await this.usuarioService.findById(createLoteDto.usuario);
    lote.usuario = usuario;

    // Asigna el cliente
    const cliente = await this.clienteService.findOne(createLoteDto.cliente);
    lote.cliente = cliente;

    // Asigna el departamento
    const departamento = await this.departamentoService.findOne(
      createLoteDto.departamento,
    );
    lote.departamento = departamento;

    return await this.loteRepository.save(lote);
  }

  async findAll(): Promise<Lote[]> {
    return await this.loteRepository.find({
      relations: [
        'defectos',
        'defectos.departamento',
        'estilo',
        'cliente',
        'departamento',
        'usuario',
        'usuarioActualizo',
      ],
    });
  }

  async findOne(id: number): Promise<Lote> {
    const lote = await this.loteRepository.findOne({
      where: { id },
      relations: [
        'defectos',
        'estilo',
        'cliente',
        'departamento',
        'usuario',
        'usuarioActualizo',
      ],
    });
    if (!lote) {
      throw new NotFoundException('Lote no encontrado');
    }
    return lote;
  }

  async updateLote(
    id: number,
    updateLoteDto: UpdateLoteDto,
    //usuarioActualizo: User,
  ): Promise<Lote> {
    const lote = await this.loteRepository.findOne({ where: { id } });

    if (!lote) {
      throw new NotFoundException('Lote not found');
    }

    // Obtener la lista de defectos proporcionados en la solicitud de actualización
    const { defectos: updatedDefectos, ...restoDeLosCampos } = updateLoteDto;

    if (updatedDefectos && updatedDefectos.length > 0) {
      // Eliminar todos los defectos existentes asociados con el lote
      await this.loteRepository
        .createQueryBuilder()
        .relation(Lote, 'defectos')
        .of(lote)
        .remove(lote.defectos);

      // Obtener los objetos de Defecto utilizando sus IDs
      const nuevosDefectos = await Promise.all(
        updatedDefectos.map(async (defectoId) => {
          return await this.defectoService.findOne(defectoId);
        }),
      );

      const usuarioup = await this.usuarioService.findById(
        updateLoteDto.usuarioActualizo,
      );
      lote.usuarioActualizo = usuarioup;

      //lote.usuarioActualizo = usuarioActualizo;
      // Asignar los nuevos defectos al lote
      lote.defectos = nuevosDefectos;
    }

    // Actualizar el resto de los campos del lote
    Object.assign(lote, restoDeLosCampos);

    // Guardar los cambios en la base de datos
    return this.loteRepository.save(lote);
  }

  async remove(id: number): Promise<void> {
    const lote = await this.findOne(id);
    await this.loteRepository.remove(lote);
  }
}
