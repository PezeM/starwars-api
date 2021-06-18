import {
  Body,
  ConflictException,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ValidationPipe } from '../shared/pipe/validation.pipe';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CharactersResponse } from './dto/characters-response.dto';
import { Character } from './entities/character.entity';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @ApiOperation({ summary: 'Retrieved list of characters and pagination data' })
  @ApiOkResponse({
    description: 'Returns characters list data with pagination metadata',
    type: CharactersResponse,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Number of page to query',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Count of characters per page',
    example: 10,
  })
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ): CharactersResponse {
    return this.characterService.findAll(page, limit);
  }

  @ApiOperation({ summary: 'Retrieved single character by name' })
  @ApiOkResponse({
    description: 'Returns single character data',
    type: Character,
  })
  @ApiNotFoundResponse({
    description: "Character with given name doesn't exist",
  })
  @ApiParam({ name: 'name', description: 'Name of character to find' })
  @Get(':name')
  getCharacterByName(@Param('name') name: string) {
    const character = this.characterService.findByName(name);
    if (!character) {
      throw new NotFoundException('Character does not exist!');
    }

    return character;
  }

  @ApiOperation({ summary: 'Add new character to characters list' })
  @ApiOkResponse({
    description: 'Returns newly created character data',
    type: Character,
  })
  @ApiConflictResponse({
    description: 'Character with given name is already defined',
  })
  @Post()
  @UsePipes(new ValidationPipe())
  createCharacter(@Body() character: CreateCharacterDto) {
    const newCharacter = this.characterService.create(character);

    if (!newCharacter) {
      throw new ConflictException(
        `Character with name ${character.name} is already defined`,
      );
    }

    return { character: newCharacter };
  }

  @ApiOperation({ summary: 'Updates character data' })
  @ApiOkResponse({
    description: 'Returns updated character data',
    type: Character,
  })
  @ApiNotFoundResponse({
    description: "Character with given name doesn't exist",
  })
  @ApiParam({ name: 'name', description: 'Name of character to delete' })
  @Put(':name')
  @UsePipes(new ValidationPipe())
  updateCharacter(
    @Param('name') name: string,
    @Body() character: UpdateCharacterDto,
  ) {
    const updatedCharacter = this.characterService.update(name, character);
    if (!updatedCharacter) {
      throw new NotFoundException('Character does not exist!');
    }

    return { character: updatedCharacter };
  }

  @ApiOperation({ summary: 'Deletes character from character list' })
  @ApiOkResponse({
    description: 'Returns true if character was deleted',
  })
  @ApiNotFoundResponse({
    description: "Character with given name doesn't exist",
  })
  @ApiParam({ name: 'name', description: 'Name of character to delete' })
  @Delete(':name')
  deleteCharacterByName(@Param('name') name: string): boolean {
    const deletedCharacter = this.characterService.delete(name);
    if (!deletedCharacter) {
      throw new NotFoundException('Character does not exist!');
    }

    return deletedCharacter;
  }
}
