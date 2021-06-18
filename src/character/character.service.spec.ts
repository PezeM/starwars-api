import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PaginationMetadata } from '../shared/pagination-metadata.entity';

describe('CharacterService', () => {
  let service: CharacterService;

  const addNewCharacter = (
    name = 'Luke',
    episodes = ['NEWHOPE'],
    planet = undefined,
  ) => {
    const characterDto = new CreateCharacterDto();
    characterDto.name = name;
    characterDto.episodes = episodes;
    characterDto.planet = planet;

    return service.create(characterDto);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterService],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return empty list of characters', () => {
      const response = service.findAll();

      expect(response).toBeDefined();
      expect(response.characters.length).toBe(0);
    });

    it('should return pagination meta', () => {
      const emptyPaginationMeta = new PaginationMetadata({
        page: 1,
        totalItems: 0,
        totalPages: 0,
        previousPage: null,
        nextPage: null,
      });

      const response = service.findAll();

      expect(response).toBeDefined();
      expect(response.meta).toBeDefined();
      expect(response.meta).toMatchObject(emptyPaginationMeta);
    });
  });

  describe('findByName', () => {
    it('should return undefined when no character is found', () => {
      const response = service.findByName('Non existing character');
      expect(response).toBe(undefined);
    });

    it('should return character if it exists', () => {
      const characterName = 'Luke';
      addNewCharacter(characterName);

      const response = service.findByName(characterName);
      expect(response).toBeDefined();
      expect(response.name).toBe(characterName);
    });
  });

  describe('create', () => {
    it('should add new character', () => {
      const characterName = 'Darth Vader';
      const characterEpisodes = ['EMPIRE'];

      const newCharacter = addNewCharacter(characterName, characterEpisodes);
      expect(newCharacter).toBeDefined();
      expect(newCharacter.name).toBe(characterName);
      expect(newCharacter.episodes).toBe(characterEpisodes);
      expect(newCharacter.planet).toBeUndefined();
      const characterList = service.findAll();
      expect(characterList.characters.length).toBe(1);
    });

    it('should return undefined when adding existing character', () => {
      const characterName = 'Darth Vader';
      const characterEpisodes = ['EMPIRE'];

      addNewCharacter(characterName, characterEpisodes);
      const response = addNewCharacter(characterName, characterEpisodes);
      expect(response).toBeUndefined();
      const characterList = service.findAll();
      expect(characterList.characters.length).toBe(1);
    });
  });

  describe('update', () => {
    it('should return undefined when updating non existing character', () => {
      const response = service.update(
        'Non existing character',
        new UpdateCharacterDto(),
      );
      expect(response).toBeFalsy();
    });

    it('should return updated character', () => {
      const characterName = 'Luke';
      const newCharacterName = 'New character name';
      addNewCharacter(characterName);

      const characterUpdate = new UpdateCharacterDto();
      characterUpdate.name = newCharacterName;
      const response = service.update(characterName, characterUpdate);
      expect(response).toBeDefined();
      expect(response.name).toBe(newCharacterName);
    });
  });

  describe('delete', () => {
    it('should return false when deleting non existing character', () => {
      const response = service.delete('Non existing character');
      expect(response).toBeFalsy();
    });

    it('should return true when deleting existing character', () => {
      const characterName = 'Luke';
      addNewCharacter(characterName);

      const response = service.delete(characterName);
      expect(response).toBe(true);
    });
  });

  describe('all methods', () => {
    it('should get all characters, create new character, find character, update character, delete character, and get all characters', () => {
      const emptyCatList = service.findAll();
      expect(emptyCatList).toBeDefined();
      expect(emptyCatList.characters.length).toBe(0);

      const characterName = 'Character name';
      const addedCharacter = addNewCharacter(characterName);
      expect(addedCharacter).toBeDefined();
      expect(addedCharacter.name).toBe(characterName);

      const findResponse = service.findByName(characterName);
      expect(findResponse).toEqual(addedCharacter);

      const newCharacterName = 'New character name';
      const characterUpdate = new UpdateCharacterDto();
      characterUpdate.name = newCharacterName;
      const updateCharacterResponse = service.update(
        characterName,
        characterUpdate,
      );
      expect(updateCharacterResponse.name).toBe(newCharacterName);

      const response = service.delete(newCharacterName);
      expect(response).toBe(true);

      const finalCharacterList = service.findAll();
      expect(finalCharacterList).toBeDefined();
      expect(finalCharacterList.characters.length).toBe(0);
    });
  });
});
