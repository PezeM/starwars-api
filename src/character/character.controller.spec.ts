import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { PaginationMetadata } from '../shared/pagination-metadata.entity';

describe('CharacterController', () => {
  let controller: CharacterController;
  let service: CharacterService;

  const testCharacterName = 'Leia Organa';
  const testCharacter: Character = {
    name: testCharacterName,
    episodes: ['NEWHOPE', 'EMPIRE', 'JEDI'],
    planet: 'Alderaan',
  };
  const paginationMeta = new PaginationMetadata({
    page: 1,
    totalItems: 1,
    totalPages: 1,
    previousPage: null,
    nextPage: null,
  });

  const response = {
    statusCode: 0,
    send: (body?: any) => {},
    status: (code: number) => {
      response.statusCode = code;
      return response;
    },
    json: (data: any) => data,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CharacterService,
          useValue: {
            findAll: jest.fn().mockReturnValue({
              characters: [testCharacter],
              meta: paginationMeta,
            }),
            findByName: jest.fn().mockReturnValue(testCharacter),
            create: jest.fn().mockReturnValue(testCharacter),
            update: jest.fn().mockReturnValue(testCharacter),
            delete: jest.fn().mockReturnValue(true),
          },
        },
      ],
      controllers: [CharacterController],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /characters', () => {
    it('should return list of characters and pagination data', () => {
      const charactersResponse = controller.findAll();

      expect(charactersResponse).toBeDefined();
      expect(charactersResponse.characters.length).toBe(1);
      expect(charactersResponse.meta).toBeDefined();
      expect(charactersResponse.meta).toMatchObject(paginationMeta);
      expect(service.findAll).toBeCalled();
    });

    it('should return one character on by name', () => {
      const result = controller.getCharacterByName(response, testCharacterName);

      expect(result).toBeDefined();
      expect(result.name).toBe(testCharacterName);
      expect(service.findByName).toBeCalled();
    });

    it('should throw exception when character is not found by name', () => {
      service.findByName = jest.fn().mockReturnValue(undefined);

      expect(() => {
        controller.getCharacterByName(response, testCharacterName);
      }).toThrow(NotFoundException);
    });
  });

  describe('POST /characters', () => {
    it('should create character on POST /characters', () => {
      const result = controller.createCharacter(
        response,
        new CreateCharacterDto(),
      );

      expect(result).toBeDefined();
      expect(result.character).toMatchObject(testCharacter);
      expect(service.create).toBeCalled();
    });

    it('should throw exception when new character was not created on POST /characters', () => {
      service.create = jest.fn().mockReturnValue(undefined);

      expect(() => {
        controller.createCharacter(response, new CreateCharacterDto());
      }).toThrow(ConflictException);
    });
  });

  describe('PUT /characters', () => {
    it('should return updated character', () => {
      const result = controller.updateCharacter(
        response,
        testCharacterName,
        new UpdateCharacterDto(),
      );

      expect(result).toBeDefined();
      expect(result.character).toMatchObject(testCharacter);
      expect(service.update).toBeCalled();
    });

    it('should throw exception when no character was found with given name', () => {
      service.update = jest.fn().mockReturnValue(undefined);

      expect(() => {
        controller.updateCharacter(
          response,
          testCharacterName,
          new UpdateCharacterDto(),
        );
      }).toThrow(NotFoundException);
    });
  });

  describe('DELETE /characters', () => {
    it('should return success status when deleted successfully', () => {
      controller.deleteCharacterByName(response, testCharacterName);

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(service.delete).toBeCalled();
    });

    it('should throw exception when no character was found with given name', () => {
      service.delete = jest.fn().mockReturnValue(undefined);

      expect(() => {
        controller.deleteCharacterByName(response, testCharacterName);
      }).toThrow(NotFoundException);
    });
  });
});
