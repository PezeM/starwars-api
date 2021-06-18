import { Character } from './character.interface';
import {
  IsArray,
  IsAscii,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCharacterDto implements Character {
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
