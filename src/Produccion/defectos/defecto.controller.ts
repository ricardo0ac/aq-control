// defecto.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DefectoService } from './defecto.service';
import { CreateDefectoDto, UpdateDefectoDto } from './defecto.dto';

@Controller('defectos')
export class DefectoController {
  constructor(private readonly defectoService: DefectoService) {}

  @Post()
  create(@Body() createDefectoDto: CreateDefectoDto) {
    return this.defectoService.create(createDefectoDto);
  }

  @Get()
  findAll() {
    return this.defectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.defectoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDefectoDto: UpdateDefectoDto) {
    return this.defectoService.update(id, updateDefectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.defectoService.remove(id);
  }
}
