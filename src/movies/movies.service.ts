import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  public movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieId: number): Movie {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) {
      throw new NotFoundException(`Фильм с id: ${movieId} не найден`);
    }
    return movie;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({ id: this.movies.length + 1, ...movieData });
  }

  remove(movieId: number) {
    this.getOne(movieId);
    this.movies = this.movies.filter((movie) => movie.id !== movieId);
  }

  patch(movieId: number, updateData: updateMovieDto) {
    const movie = this.getOne(movieId);
    this.remove(movieId);
    this.movies.push({ ...movie, ...updateData });
  }
}
