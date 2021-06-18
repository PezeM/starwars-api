import { Character } from '../entities/character.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetadata } from '../../shared/pagination-metadata.entity';

export class CharactersResponse {
  @ApiProperty({
    description: 'List of characters',
    type: [Character],
  })
  characters: Character[];

  @ApiProperty({
    description: 'Pagination meta data',
    type: PaginationMetadata,
  })
  meta: PaginationMetadata;

  constructor(characters: Character[], meta: PaginationMetadata) {
    this.characters = characters;
    this.meta = meta;
  }
}
