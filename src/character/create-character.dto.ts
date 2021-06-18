import { Character } from './character.interface';

export class CreateCharacterDto implements Character {
  name: string;
  episodes: string[];
  planet?: string;
}
