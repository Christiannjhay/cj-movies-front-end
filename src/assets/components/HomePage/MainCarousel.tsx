import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PlayIcon from "@/icons/PlayIcon";
import StarIcon from "@/icons/StarIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  duration: number;
  genres: { id: number; name: string }[];
}

export default function MainCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const popularMoviesUrl =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const apiKey = import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN;

      try {
        const response = await fetch(popularMoviesUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const data = await response.json();
        const popularMovies: Movie[] = data.results;

        const detailedMoviesPromises = popularMovies.map(async (movie) => {
          const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=credits&language=en-US`;

          const response = await fetch(movieDetailsUrl, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          });
          const movieDetailsData = await response.json();

          movie.duration = movieDetailsData.runtime;
          movie.genres = movieDetailsData.genres.slice(0, 3);

          return movie;
        });

        const detailedMovies = await Promise.all(detailedMoviesPromises);
        setMovies(detailedMovies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getYearFromDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  const formatVoteAverage = (voteAverage: number): string => {
    return voteAverage.toFixed(1);
  };

  return (
    <Carousel >
      <CarouselContent >
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="relative">
                <Skeleton className="w-full h-[300px] 2xl:h-[1080px] xl:h-[700px] lg:h-[600px] md:h-[500px] sm:h-[400px] rounded-md" />
                <div className="absolute inset-0 bg-black/50"></div>
              </CarouselItem>
            ))
          : movies.map((movie) => (
              <CarouselItem key={movie.id} className="p-0">
                <div className="w-full h-fit relative bg-[#181818]">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-[300px] 2xl:h-[1080px] xl:h-[700px] lg:h-[600px] md:h-[500px] sm:h-[400px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="absolute bottom-[2%] sm:bottom-[5%] md:bottom-[10%] lg:bottom-[20%] xl:bottom-[25%] 2xl:bottom-[39%] sm:left-4 left-4 md:left-24 text-white w-[70%]">
                    <h1 className="text-white font-extrabold text-sm md:text-3xl lg:text-4xl">
                      {movie.title}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-12 ">
                      <div className="flex flex-row mt-0 sm:mt-0 md:mt-2 col-span-1">
                        <h1 className="text-slate-300 text-sm md:text-base">
                          {getYearFromDate(movie.release_date)}
                        </h1>
                        <h1 className="ml-2 text-slate-300 text-sm md:text-base">
                          {movie.duration}
                        </h1>
                        <h1 className="ml-1 text-slate-300 text-sm md:text-base">
                          min
                        </h1>
                        <div className="ml-3 text-sm md:text-base text-yellow-400">
                          <StarIcon />
                        </div>
                        <h1 className="ml-1 text-slate-300 text-sm md:text-base">
                          {formatVoteAverage(movie.vote_average)}
                        </h1>
                      </div>
                      <div className="flex flex-row mb-2 md:ml-28 lg:ml-24 xl:ml-24 2xl:ml-16 mt-2 col-span-11">
                        {movie.genres.map((genre) => (
                          <div
                            key={genre.id}
                            className="mr-2 text-sm md:text-base md:block"
                          >
                            <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs lg:text-sm md:text-xs font-semibold">
                              {genre.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <h2 className="lg:text-lg xl:text-xl text-white font-light mt-2 line-clamp-3 hidden md:block">
                      {movie.overview}
                    </h2>
                    <Button
                      onClick={() => {
                        console.log("Clicked movie ID:", movie.id);
                        navigate(`/view-movie/${movie.id}`);
                      }}
                      className="bg-[#FF3131] hover:bg-red-600 text-white py-3 px-4 md:px-6 md:py-6 md:mt-4 rounded-full mt-1 flex items-center"
                    >
                      <PlayIcon />
                      <h1 className="ml-2 font-normal text-xs text-white md:text-base">
                        Watch Now
                      </h1>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
      <div className="bg-red-500 relative justify-end mr-36 2xl:bottom-[430px] xl:bottom-[200px] lg:bottom-[140px] md:bottom-[65px] hidden md:flex md:justify-end">
        <div className="flex absolute">
          <div className="">
            <CarouselNext />
          </div>
          <div className="mr-5">
            <CarouselPrevious />
          </div>
        </div>
      </div>
    </Carousel>
  );
}
