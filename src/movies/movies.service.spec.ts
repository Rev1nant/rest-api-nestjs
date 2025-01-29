import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('testing the getAll function', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('testing the getOne function', () => {
    it('should return the movie', () => {
      service.create({
        title: 'test movie',
        year: 2000,
        genres: ['test genres'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should return 404 error', () => {
      try {
        service.getOne(1);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('testing the remove function', () => {
    it('The movie is removed', () => {
      service.create({
        title: 'test movie',
        year: 2000,
        genres: ['test genres'],
      });
      service.remove(1);
      expect(service.getAll().length).toEqual(0);
    });

    it('should return 404 error', () => {
      try {
        service.remove(1);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('testing the create function', () => {
    it('Making a new movie', () => {
      service.create({
        title: 'test movie',
        year: 2000,
        genres: ['test genres'],
      });
      expect(service.getAll().length).toEqual(1);
      expect(service.getOne(1)).toBeDefined();
    });
  });

  describe('testing the path function', () => {
    it('The movie must change', () => {
      service.create({
        title: 'test movie',
        year: 2000,
        genres: ['test genres'],
      });
      service.patch(1, { title: 'Update movie' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update movie');
    });

    it('should return 404 error', () => {
      try {
        service.patch(1, { title: 'Update movie' });
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
