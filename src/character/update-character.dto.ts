import { Character } from './character.interface';
import {
  IsArray,
  IsAscii,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCharacterDto implements Partial<Character> {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsAscii()
  name?: string;

  @IsArray()
  @IsOptional()
  episodes?: string[];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsAscii()
  planet?: string;
}
