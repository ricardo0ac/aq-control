import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EstiloService } from './estilo.service';
import { Estilo } from './estilo.entity';
import { CreateEstiloDto, UpdateEstiloDto } from './estilo.dto';

@Controller('estilos')
export class EstiloController {
  constructor(private readonly estiloService: EstiloService) {}

  @Post()
  async create(@Body() createEstiloDto: CreateEstiloDto): Promise<Estilo> {
    return await this.estiloService.create(createEstiloDto);
  }

  @Get()
  async findAll(): Promise<Estilo[]> {
    return await this.estiloService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Estilo> {
    return await this.estiloService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEstiloDto: UpdateEstiloDto,
  ): Promise<Estilo> {
    return await this.estiloService.update(+id, updateEstiloDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.estiloService.remove(+id);
  }
}
