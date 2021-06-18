import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

describe('CharacterController', () => {
  let controller: CharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterService],
      controllers: [CharacterController],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET on /characters should return empty list of characters', async () => {
    const charactersResponse = await controller.findAll();

    expect(charactersResponse).toBeDefined();
    expect(charactersResponse.characters.length).toBe(0);
  });
});
