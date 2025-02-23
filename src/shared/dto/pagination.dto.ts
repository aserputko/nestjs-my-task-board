import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_PAGE_NUMBER = 1;

export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  pageSize?: number = DEFAULT_PAGE_SIZE;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  pageNumber?: number = DEFAULT_PAGE_NUMBER;
}

export class PaginationResultDto<T> {
  data: T[];
  pagination: {
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
  };
}

export const toPaginationResult = <T>(
  data: T[],
  totalRecords: number,
  pageSize: number = DEFAULT_PAGE_SIZE,
  pageNumber: number = DEFAULT_PAGE_NUMBER,
): PaginationResultDto<T> => {
  return {
    data,
    pagination: {
      totalRecords,
      pageSize,
      pageNumber,
    },
  };
};

export const toSkillOption = (pageNumber?: number, pageSize?: number) => {
  return ((pageNumber || DEFAULT_PAGE_NUMBER) - 1) * (pageSize || DEFAULT_PAGE_SIZE);
};
