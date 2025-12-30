import {
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  published_at?: string;

  @IsOptional()
  @IsNotEmpty()
  coverUrl?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  pages?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
