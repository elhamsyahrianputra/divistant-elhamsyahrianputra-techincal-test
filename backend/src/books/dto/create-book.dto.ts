import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxDate,
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
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  publishedAt?: Date;

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

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  authors: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(3)
  @IsUUID('4', { each: true })
  genres: string[];
}
