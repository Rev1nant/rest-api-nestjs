-- DropForeignKey
ALTER TABLE "Genres" DROP CONSTRAINT "Genres_movieId_fkey";

-- AddForeignKey
ALTER TABLE "Genres" ADD CONSTRAINT "Genres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
