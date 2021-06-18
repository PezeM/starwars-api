import {
  IsArray,
  IsAscii,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Character } from '../entities/character.entity';

export class CreateCharacterDto extends Character {
  @IsString()
  @IsNotEmpty()
  @IsAscii()
  name: string;

  @IsArray()
  episodes: string[];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsAscii()
  planet?: string;
}
