import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsString({ each: true })
  @ApiProperty({
    example: ['test-genre'],
    required: true,
  })
  readonly genres: string[];
}
