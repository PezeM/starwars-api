import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './create-character.dto';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterService],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add new character', () => {
    const characterName = 'Luke';
    const characterEpisodes = ['NEWHOPE'];

    const characterDto = new CreateCharacterDto();
    characterDto.name = characterName;
    characterDto.episodes = characterEpisodes;

    const newCharacter = service.create(characterDto);
    expect(newCharacter).toBeDefined();
    expect(newCharacter.name).toBe(characterName);
    expect(newCharacter.episodes).toBe(characterEpisodes);
  });

  describe('deleteCharacter', () => {
    it('should return false when deleting non existing character', () => {
      const response = service.deleteByName('Non existing character');
      expect(typeof response).toBe('boolean');
      expect(response).toBe(false);
    });
  });
});
