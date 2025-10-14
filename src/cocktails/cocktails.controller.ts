import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CocktailsService, Cocktail } from './cocktails.service';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Get()
  async findAll(): Promise<Cocktail[]> {
    return this.cocktailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cocktail | null> {
    return this.cocktailsService.findOne(Number(id));
  }

  @Post()
  async create(
    @Body()
    data: {
      name: string;
      category?: string;
      instruction?: string;
      ingredients?: { name: string; isAlcohol: boolean }[];
    }
  ): Promise<Cocktail> {
    return this.cocktailsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: {
      name?: string;
      category?: string;
      instruction?: string;
      ingredients?: { name: string; isAlcohol: boolean }[];
    }
  ): Promise<Cocktail> {
    return this.cocktailsService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Cocktail> {
    return this.cocktailsService.remove(Number(id));
  }
}