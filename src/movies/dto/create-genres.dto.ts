import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @ApiProperty({
    example: 'test-genre',
    required: true,
  })
  readonly name: string;
}
