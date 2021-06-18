import {
  IsArray,
  IsAscii,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Character } from '../entities/character.entity';

export class UpdateCharacterDto extends PartialType(Character) {
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
