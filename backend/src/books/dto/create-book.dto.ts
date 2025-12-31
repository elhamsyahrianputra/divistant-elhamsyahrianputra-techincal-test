import { Type } from 'class-transformer';
import {
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

  // @IsOptional()
  // @IsNotEmpty()
  // @IsDateString()
  // @MaxDate(new Date(new Date().setDate(new Date().getDate() - 1)), { message: "Tanggal maksimal yang diperbolehkan adalah kemarin", })
  // publishedAt?: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Date) // ⬅️ PENTING
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
}
