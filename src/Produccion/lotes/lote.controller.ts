import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { LoteService } from './lote.service';
import { CreateLoteDto, UpdateLoteDto } from './lote.dto';
import { Lote } from './lote.entity';
import { User } from 'src/auth/entities/user.entity';
import { Auth, GetUser } from 'src/auth/decorators';

@Controller('lotes')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  async createLote(@Body() createLoteDto: CreateLoteDto) {
    return this.loteService.create(createLoteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLoteDto: UpdateLoteDto,
    // @GetUser() usuarioActualizo: User,
  ) {
    const lote = await this.loteService.updateLote(
      id,
      updateLoteDto,
      //usuarioActualizo,
    );
    if (!lote) {
      throw new NotFoundException('Lote no encontrado');
    }
    return lote;
  }

  @Get()
  findAll(): Promise<Lote[]> {
    return this.loteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lote> {
    return this.loteService.findOne(+id);
  }

  /*
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLoteDto: UpdateLoteDto,
    @GetUser() usuarioActualizo: User,
  ) {
    const lote = await this.loteService.updateLote(
      id,
      updateLoteDto,
      usuarioActualizo,
    );
    if (!lote) {
      throw new NotFoundException('Lote no encontrado');
    }
    return lote;
  }*/

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.loteService.remove(+id);
  }
}
