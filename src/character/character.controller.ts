import {
  Body,
  ConflictException,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharactersResponse } from './characters-response.interface';
import { CreateCharacterDto } from './create-character.dto';
import { UpdateCharacterDto } from './update-character.dto';
import { ValidationPipe } from '../shared/pipe/validation.pipe';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ): Promise<CharactersResponse> {
    return this.characterService.findAll(page, limit);
  }

  @Get(':name')
  async getCharacterByName(@Res() res, @Param('name') name: string) {
    const character = this.characterService.findByName(name);
    if (!character) {
      throw new NotFoundException('Character does not exist!');
    }

    return res.status(HttpStatus.OK).json(character);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createCharacter(@Res() res, @Body() character: CreateCharacterDto) {
    const newCharacter = this.characterService.create(character);

    if (!newCharacter) {
      throw new ConflictException(
        `Character with name ${character.name} is already defined`,
      );
    }

    return res.status(HttpStatus.OK).json({
      message: 'Character has been successfully created!',
      character: newCharacter,
    });
  }

  @Put(':name')
  @UsePipes(new ValidationPipe())
  async updateCharacter(
    @Res() res,
    @Param('id') name: string,
    @Body() character: UpdateCharacterDto,
  ) {
    const updatedCharacter = this.characterService.update(name, character);
    if (!updatedCharacter) {
      throw new NotFoundException('Character does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Character has been successfully updated!',
      character: updatedCharacter,
    });
  }

  @Delete(':name')
  async deleteCharacterByName(@Res() res, @Param(':name') name: string) {
    const deletedPost = this.characterService.deleteByName(name);
    if (!deletedPost) {
      throw new NotFoundException('Character does not exist!');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Character has been successfully deleted!',
    });
  }
}
