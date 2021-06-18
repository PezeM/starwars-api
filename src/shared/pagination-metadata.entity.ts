import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetadata {
  @ApiProperty({
    example: 1,
    description: 'Number of current page',
  })
  readonly page: number;

  @ApiProperty({
    example: 10,
    description: 'Total number of items',
  })
  readonly totalItems: number;

  @ApiProperty({
    example: 3,
    description: 'Total number of pages',
  })
  readonly totalPages: number;

  @ApiProperty({
    nullable: true,
    example: 2,
    description: 'Number of previous page',
  })
  readonly previousPage: number | null;

  @ApiProperty({
    nullable: true,
    example: 3,
    description: 'Number of next page',
  })
  readonly nextPage?: number | null;

  constructor(data: PaginationMetadata) {
    Object.assign(this, data);
  }
}
