import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/dto/pagination.dto';

export class GetTasksDto extends PaginationQueryDto {
  @Type(() => String)
  @IsOptional()
  search?: string;

  @Type(() => String)
  @IsOptional()
  orderBy?: string;

  @Type(() => String)
  @IsOptional()
  orderDirection?: string;
}
