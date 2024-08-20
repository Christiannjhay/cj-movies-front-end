import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HomeHeader from "./HomeHeader";
import { Button } from "@/components/ui/button";
import PlayIcon from "@/icons/PlayIcon";
import StarIcon from "@/icons/StarIcon";
import { Card, CardContent } from "@/components/ui/card";
import Recommended from "./Recommended";
import { Skeleton } from "@/components/ui/skeleton";
import { register } from 'swiper/element/bundle';

register();

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

interface TopMovies {
  id: number;
  title: string;
  poster_path: string;
  genres: { id: number; name: string }[];
}

export default function TrendingMoviesCard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<TopMovies[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

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
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const apiKey = import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN;
        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=2`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch top rated movies");
        }

        const data = await response.json();
        const topRatedMovies: TopMovies[] = data.results.map(
          async (movie: any) => {
            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;
            const detailsResponse = await fetch(movieDetailsUrl, {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
            });

            if (!detailsResponse.ok) {
              throw new Error(`Failed to fetch details for movie ${movie.id}`);
            }

            const detailsData = await detailsResponse.json();
            const genres = detailsData.genres.slice(0, 3);

            return {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              backdrop_path: movie.backdrop_path,
              genres: genres,
            };
          }
        );

        const resolvedTopRatedMovies = await Promise.all(topRatedMovies);
        setTopRatedMovies(resolvedTopRatedMovies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
    fetchTopRatedMovies();
  }, []);

  const getYearFromDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  const formatVoteAverage = (voteAverage: number): string => {
    return voteAverage.toFixed(1);
  };

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center relative">
        <div className="w-full absolute mt-24 z-20">
          <HomeHeader />
        </div>
      </div>
      <div className="absolute h-full">
        <Carousel className="w-full min-h-fit lg:h-fit z-10">
          <div className="absolute w-full top-[29%] 2xl:top-[62%] xl:top-[51%] lg:top-[40%] md:top-[47%] sm:top-[38%] z-30">
            <div className="hidden relative mr-[14%] lg:block">
              <CarouselNext />
            </div>
            <div className="relative hidden ml-[84%] lg:block">
              <CarouselPrevious />
            </div>
            <div>
              <div>
                <h1 className="flex justify-center font-bold text-white">
                  Trending Movies
                </h1>
              </div>
              <div className="mt-2 pl-2">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-[95%]"
                >
                  <CarouselContent>
                    {isLoading
                      ? // Skeleton Loading State
                        Array.from({ length: 4 }).map((_, index) => (
                          <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/4 relative"
                          >
                            <Skeleton className="w-full h-72 rounded-lg" />
                          </CarouselItem>
                        ))
                      : topRatedMovies.map((movie) => (
                          <CarouselItem
                            key={movie.id}
                            className="md:basis-1/2 lg:basis-1/4 relative min-h-[288px]"
                          >
                            <div className="absolute inset-0 bg-black opacity-55"></div>

                            <div>
                              <Card
                                onClick={() => {
                                  navigate(`/view-movie/${movie.id}`);
                                }}
                                style={{
                                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  border: "none",
                                  boxShadow: "none",
                                  borderRadius: "20px",
                                }}
                              >
                                <CardContent className="flex justify-start items-end p-3 py-2 h-72 relative">
                                  <div className="flex flex-col">
                                    <span className="text-xl text-white font-bold z-10 relative bottom-3">
                                      {movie.title}
                                    </span>
                                    <h1 className="z-10 relative flex bottom-2">
                                      {movie.genres.map((genre) => (
                                        <div
                                          key={genre.id}
                                          className="mr-2 text-sm md:text-base"
                                        >
                                          <span className=" text-[#ff3131] py-1 text-sm font-bold">
                                            {genre.name}
                                          </span>
                                        </div>
                                      ))}
                                    </h1>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                  </CarouselContent>
                  <CarouselNext className="h-20 hidden top-[60%] left-[101%] lg:block" />
                  <CarouselPrevious className="h-20 hidden left-[101%] top-[30%] lg:block" />
                </Carousel>
              </div>
            </div>
           <Recommended/>
          </div>

          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.id}>
                <div className="w-full h-[1080px] relative bg-[#181818]">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-[300px] 2xl:h-[1080px] xl:h-[700px] lg:h-[600px] md:h-[500px] sm:h-[400px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="absolute bottom-[73%] sm:bottom-[65%] md:bottom-[55%] lg:bottom-[60%] xl:bottom-[50%] 2xl:bottom-[39%] sm:left-4 left-4 md:left-24 text-white w-[70%]">
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
        </Carousel>
      </div>
    </div>
  );
}
