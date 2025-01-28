import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
  }

  async getOne(id: number): Promise<Movie> {
    const movie = this.prisma.movie.findUnique({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Фильм с id: ${id} не найден`);
    }
    return movie;
  }

  async create(movieData: CreateMovieDto): Promise<Movie> {
    return this.prisma.movie.create({
      data: {
        title: movieData.title,
        year: movieData.year,
        genres: {
          create: movieData.genres.map((genre) => ({
            name: genre.name,
          })),
        },
      },
    });
  }

  async remove(id: number): Promise<Movie> {
    return this.prisma.movie.delete({ where: { id } });
  }

  async patch(id: number, movieData: updateMovieDto): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id },
      data: {
        title: movieData.title,
        year: movieData.year,
        genres: {
          create: movieData.genres.map((genre) => ({
            name: genre.name,
          })),
        },
      },
    });
  }
}
