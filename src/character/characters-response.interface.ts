import { Character } from './character.interface';
import { PaginationMetadata } from '../shared/pagination-metadata.interface';

export interface CharactersResponse {
  characters: Character[];
  meta: PaginationMetadata;
}
