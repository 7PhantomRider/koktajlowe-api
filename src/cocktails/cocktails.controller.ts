import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CocktailsService, type Cocktail } from './cocktails.service';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Get()
  getAll(): Cocktail[] {
    return this.cocktailsService.findAll();
  }

  @Post()
  create(@Body() cocktail: Omit<Cocktail, 'id'>): Cocktail {
    return this.cocktailsService.create(cocktail);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() cocktail: Partial<Omit<Cocktail, 'id'>>): Cocktail | string {
    const updated = this.cocktailsService.update(Number(id), cocktail);
    return updated || 'Cocktail not found';
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    const deleted = this.cocktailsService.remove(Number(id));
    return deleted ? 'Deleted' : 'Cocktail not found';
  }
}