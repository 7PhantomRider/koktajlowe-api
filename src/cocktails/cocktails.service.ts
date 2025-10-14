import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interfejsy dopasowane do schematu Prisma
export interface Ingredient {
  name: string;
  isAlcohol: boolean;
}

export interface Cocktail {
  id: number;
  name: string;
  category: string | null;
  instruction: string | null;
  ingredients: Ingredient[];
}

@Injectable()
export class CocktailsService {
  // Pobierz wszystkie koktajle
  async findAll(): Promise<Cocktail[]> {
    const cocktails = await prisma.cocktail.findMany({
      include: { ingredients: true },
    });

    return cocktails.map(c => ({
      id: c.id,
      name: c.name,
      category: c.category,
      instruction: c.instruction,
      ingredients: c.ingredients.map(i => ({ name: i.name, isAlcohol: i.isAlcohol })),
    }));
  }

  // Pobierz koktajl po ID
  async findOne(id: number): Promise<Cocktail | null> {
    const cocktail = await prisma.cocktail.findUnique({
      where: { id },
      include: { ingredients: true },
    });

    if (!cocktail) return null;

    return {
      id: cocktail.id,
      name: cocktail.name,
      category: cocktail.category,
      instruction: cocktail.instruction,
      ingredients: cocktail.ingredients.map(i => ({ name: i.name, isAlcohol: i.isAlcohol })),
    };
  }

  // Stwórz nowy koktajl
  async create(data: {
    name: string;
    category?: string;
    instruction?: string;
    ingredients?: { name: string; isAlcohol: boolean }[];
  }): Promise<Cocktail> {
    const cocktail = await prisma.cocktail.create({
      data: {
        name: data.name,
        category: data.category || null,
        instruction: data.instruction || null,
        ingredients: {
          create: data.ingredients?.map(i => ({
            name: i.name,
            isAlcohol: i.isAlcohol,
          })) || [],
        },
      },
      include: { ingredients: true },
    });

    return {
      id: cocktail.id,
      name: cocktail.name,
      category: cocktail.category,
      instruction: cocktail.instruction,
      ingredients: cocktail.ingredients.map(i => ({ name: i.name, isAlcohol: i.isAlcohol })),
    };
  }

  // Zaktualizuj koktajl
  async update(
    id: number,
    data: {
      name?: string;
      category?: string;
      instruction?: string;
      ingredients?: { name: string; isAlcohol: boolean }[];
    }
  ): Promise<Cocktail> {
    if (data.ingredients) {
      // usuń stare składniki
      await prisma.ingredient.deleteMany({ where: { cocktailId: id } });
    }

    const cocktail = await prisma.cocktail.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        instruction: data.instruction,
        ingredients: data.ingredients
          ? { create: data.ingredients.map(i => ({ name: i.name, isAlcohol: i.isAlcohol })) }
          : undefined,
      },
      include: { ingredients: true },
    });

    return {
      id: cocktail.id,
      name: cocktail.name,
      category: cocktail.category,
      instruction: cocktail.instruction,
      ingredients: cocktail.ingredients.map(i => ({ name: i.name, isAlcohol: i.isAlcohol })),
    };
  }

  // Usuń koktajl
  async remove(id: number): Promise<Cocktail> {
    const cocktail = await prisma.cocktail.delete({
      where: { id },
      include: { ingredients: true },
    });

    return {
      id: cocktail.id,
      name: cocktail.name,
      category: cocktail.category,
      instruction: cocktail.instruction,
      ingredients: cocktail.ingredients.map(i => ({ name: i.name, isAlcohol: i.isAlcohol })),
    };
  }
}