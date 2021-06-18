export interface PaginationMetadata {
  readonly page: number;
  readonly totalItems: number;
  readonly totalPages: number;
  readonly previousPage: number | null;
  readonly nextPage?: number | null;
}
