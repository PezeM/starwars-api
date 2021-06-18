import { ApiProperty } from '@nestjs/swagger';

export class Character {
  @ApiProperty({
    example: 'Luke Skywalker',
    description: 'Name of the character',
  })
  name: string;

  @ApiProperty({
    example: ['NEWHOPE', 'EMPIRE'],
    description: 'The names of the episodes in which the character appeared',
  })
  episodes: string[];

  @ApiProperty({
    example: 'Alderaan',
    description: 'The name of the planet the character comes from',
    required: false,
  })
  planet?: string;
}
