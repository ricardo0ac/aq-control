import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { CreateClienteDto, UpdateClienteDto } from './cliente.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return await this.clienteService.create(createClienteDto);
  }

  @Get()
  async findAll(): Promise<Cliente[]> {
    return await this.clienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cliente> {
    return await this.clienteService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    return await this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.clienteService.remove(+id);
  }

  @Get(':status')
  async findAllByStatus(@Param('status') status: string): Promise<Cliente[]> {
    return await this.clienteService.findAllByStatus(status);
  }
}
