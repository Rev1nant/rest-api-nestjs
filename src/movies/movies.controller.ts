import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Get()
  async getAll(): Promise<Movie[]> {
    return this.MoviesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Movie> {
    return this.MoviesService.getOne(id);
  }

  @Post()
  async create(@Body() movieData: CreateMovieDto): Promise<Movie> {
    return this.MoviesService.create(movieData);
  }

  @Patch(':id')
  async patch(
    @Param('id') movieId: number,
    @Body() updateData: updateMovieDto,
  ) {
    return this.MoviesService.patch(movieId, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') movieId: number) {
    return this.MoviesService.remove(movieId);
  }
}
