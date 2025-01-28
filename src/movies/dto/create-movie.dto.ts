import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CreateGenreDto } from './create-genres.dto';

export class CreateMovieDto {
  @IsString()
  @ApiProperty({
    example: 'test-movie',
    required: true,
  })
  readonly title: string;

  @IsNumber()
  @ApiProperty({
    example: 2000,
    required: true,
  })
  readonly year: number;

  @IsOptional()
  @IsObject({ each: true })
  @ApiProperty({
    example: ['test-genre'],
    required: true,
  })
  readonly genres: CreateGenreDto[];
}
