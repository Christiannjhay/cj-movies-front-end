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
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN;
      
      if (!apiKey) {
        console.error('❌ API key is missing!');
        setIsLoading(false);
        return;
      }
  
      try {
        // Fetch popular movies
        const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;
        const popularResponse = await fetch(popularMoviesUrl);
        
        if (!popularResponse.ok) {
          throw new Error(`Failed to fetch popular movies: ${popularResponse.status}`);
        }
        
        const popularData = await popularResponse.json();
        const popularMovies: Movie[] = popularData.results;
  
        // Fetch details for each movie
        const detailedMoviesPromises = popularMovies.map(async (movie) => {
          const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=credits&language=en-US&api_key=${apiKey}`;
          const detailsResponse = await fetch(movieDetailsUrl);
          
          if (!detailsResponse.ok) {
            console.warn(`Failed to fetch details for movie ${movie.id}`);
            return movie; // Return movie without details
          }
          
          const movieDetailsData = await detailsResponse.json();
          movie.duration = movieDetailsData.runtime;
          movie.genres = movieDetailsData.genres?.slice(0, 3) || [];
          
          return movie;
        });
  
        const detailedMovies = await Promise.all(detailedMoviesPromises);
        setMovies(detailedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchMovies();
  }, []);
  
  return (
    <div className="relative max-w-[1800px] mx-auto">
      <Carousel className="w-11/12 min-h-fit lg:h-fit rounded-[20px]">
        <CarouselContent>
          {isLoading
            ? 
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
