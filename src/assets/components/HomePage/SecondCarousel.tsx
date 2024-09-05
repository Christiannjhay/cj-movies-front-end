import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface TopMovies {
  id: number;
  title: string;
  poster_path: string;
  genres: { id: number; name: string }[];
}

export default function SecondCarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState<TopMovies[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    
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

    
    fetchTopRatedMovies();
  }, []);
  
  return (
    <div className="relative ">
      <Carousel className="w-11/12 min-h-fit lg:h-fit ">
        <CarouselContent>
          {isLoading
            ? // Skeleton Loading State
              Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/4 relative "
                >
                  <Skeleton className="w-full h-72 rounded-lg " />
                </CarouselItem>
              ))
            : topRatedMovies.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="md:basis-1/2 lg:basis-1/4 relative min-h-[288px]"
                >
                  <div className="absolute inset-0 bg-black opacity-65"></div>
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
                      <CardContent className="flex justify-start items-end p-3 py-2 h-72 relative  rounded-xl ">
                        <div className="flex flex-col ">
                          <span className="text-xl text-white font-bold z-10 relative bottom-3 ">
                            {movie.title}
                          </span>
                          <h1 className="z-10 relative flex bottom-2 ">
                            {movie.genres.map((genre) => (
                              <div
                                key={genre.id}
                                className="mr-2 text-sm md:text-base "
                              >
                                <span className=" text-[#ff3131] py-1 text-sm font-bold ">
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
  );
}
