import { Injectable } from '@nestjs/common';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './entities/character.entity';
import { CharactersResponse } from './dto/characters-response.dto';
import { PaginationMetadata } from '../shared/pagination-metadata.entity';

@Injectable()
export class CharacterService {
  private characters: Character[] = [];

  findAll(page = 1, limit = 10): CharactersResponse {
    limit ||= 10;
    const totalPages = Math.ceil(this.characters.length / limit);
    const offset = limit * (page - 1);
    const characters = this.characters.slice(offset, limit * page);
    const paginationMeta = new PaginationMetadata({
      page,
      totalPages,
      totalItems: this.characters.length,
      nextPage: totalPages > page ? page + 1 : null,
      previousPage: page - 1 > 0 ? page - 1 : null,
    });

    return new CharactersResponse(characters, paginationMeta);
  }

  findByName(name: string): Character | undefined {
    return this.characters.find(c => c.name === name);
  }

  create(newCharacter: CreateCharacterDto): Character | undefined {
    if (this.characters.some(c => c.name === newCharacter.name))
      return undefined;

    this.characters.push(newCharacter);
    return newCharacter;
  }

  update(
    name: string,
    updatedCharacter: UpdateCharacterDto,
  ): Character | undefined {
    const index = this.characters.findIndex(c => c.name === name);
    if (index < 0) return undefined;
    this.characters[index] = { ...this.characters[index], ...updatedCharacter };
    return this.characters[index];
  }

  delete(name: string): boolean {
    const index = this.characters.findIndex(c => c.name === name);
    if (index < 0) return false;
    this.characters.splice(index, 1);
    return true;
  }
}
