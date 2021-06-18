import { ValidationPipe } from './validation.pipe';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateCharacterDto } from '../../character/create-character.dto';

describe('ValidationPipe', () => {
  let target: ValidationPipe;

  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateCharacterDto,
    data: '',
  };

  beforeEach(() => {
    target = new ValidationPipe();
  });

  it('should throw an error on empty object', async () => {
    const dto = new CreateCharacterDto();

    await expect(async () => {
      await target.transform(dto, metadata);
    }).rejects.toThrowError(BadRequestException);
  });

  it('should throw an error on missing properties', async () => {
    const dto = new CreateCharacterDto();
    dto.name = 'Test name';

    await expect(async () => {
      await target.transform(dto, metadata);
    }).rejects.toThrowError(BadRequestException);
  });

  it('should validate existing properties', async () => {
    const dto = new CreateCharacterDto();
    dto.name = 'Test name';
    dto.episodes = ['Episode'];

    const result = await target.transform(dto, metadata);

    expect(result).toBeDefined();
    expect(result).toMatchObject(dto);
  });
});
