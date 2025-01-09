import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('testing the getAll function', () => {
    it('should return an array', () => {
      const result = controller.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('testing the getOne function', () => {
    it('should return the movie', () => {
      controller.create({
        title: 'test movie',
        year: 2000,
        genres: ['test genres'],
      });
      const movie = controller.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should return 404 error', () => {
      try {
        controller.getOne(1);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('testing the remove function', () => {
    it('The movie is removed', () => {
      controller.create({
        title: 'test movie',
        year: 2000,
        genres: ['test genres'],
      });
      controller.remove(1);
      expect(controller.getAll().length).toEqual(0);
    });

    it('should return 404 error', () => {
      try {
        controller.remove(1);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('testing the create function', () => {
    it('Making a new movie', () => {
      controller.create({
        title: 'test movie',
        year: 2000,
        genres: ['test genres'],
      });
      expect(controller.getAll().length).toEqual(1);
      expect(controller.getOne(1)).toBeDefined();
    });
  });

  describe('testing the path function', () => {
    it('The movie must change', () => {
      controller.create({
        title: 'test movie',
        year: 2000,
        genres: ['test genres'],
      });
      controller.patch(1, { title: 'Update movie' });
      const movie = controller.getOne(1);
      expect(movie.title).toEqual('Update movie');
    });

    it('should return 404 error', () => {
      try {
        controller.patch(1, { title: 'Update movie' });
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
