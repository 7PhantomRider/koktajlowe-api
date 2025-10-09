import { Injectable } from '@nestjs/common';

export interface Cocktail {
  id: number;
  name: string;
  category: string;
  instructions: string;
  ingredients: string[];
}

@Injectable()
export class CocktailsService {
  private cocktails: Cocktail[] = [];

  findAll(): Cocktail[] {
    return this.cocktails;
  }

  findOne(id: number): Cocktail | undefined {
    return this.cocktails.find(c => c.id === id);
  }

  create(cocktail: Omit<Cocktail, 'id'>): Cocktail {
    const newCocktail = { id: Date.now(), ...cocktail };
    this.cocktails.push(newCocktail);
    return newCocktail;
  }

  update(id: number, updatedCocktail: Partial<Cocktail>): Cocktail | undefined {
    const cocktail = this.cocktails.find(c => c.id === id);
    if (!cocktail) return undefined;
    Object.assign(cocktail, updatedCocktail);
    return cocktail;
  }

  remove(id: number): boolean {
    const index = this.cocktails.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.cocktails.splice(index, 1);
    return true;
  }
}