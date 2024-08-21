import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MovieCard from "../HomePage/MovieCard";
import MovieTooltip from "../MovieTooltip";
import RecommendedIcon2 from "@/icons/RecommendedIcon2";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  production_countries?: { name: string }[];
  genres?: { id: number; name: string }[];
}

interface SearchResultProps {}

export default function SearchResult({}: SearchResultProps) {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("query") || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN}`,
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await response.json();

        // Fetch detailed information for each movie
        const detailedMovies = await Promise.all(
          data.results.map(async (movie: { id: number }) => {
            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`;
            const movieDetailsResponse = await fetch(movieDetailsUrl, {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN}`,
              },
            });
            const movieDetails = await movieDetailsResponse.json();
            return movieDetails;
          })
        );

        setMovies(detailedMovies);
      } catch (error) {
        console.error("Error fetching movies or details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  const getYearFromDate = (date: string) => {
    return date.split("-")[0];
  };

  const getTopGenres = (genres: { id: number; name: string }[] | undefined) => {
    if (!genres) {
      return [];
    }
    return genres.slice(0, 3).map((genre) => genre.name);
  };

  const getTopProductionCountries = (countries: { name: string }[] | undefined) => {
    if (!countries) {
      return [];
    }
    return countries.slice(0, 3).map((country) => country.name);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-7 bg-[#181818] w-full">
      <h2 className="text-xl font-bold text-white mb-4">
        <div className="flex flex-row items-center">
          <RecommendedIcon2 />
          <div className="mt-3 ml-2">SEARCH: {searchTerm.toUpperCase()}</div>
        </div>
      </h2>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieTooltip
              id={movie.id}
              key={movie.id}
              title={movie.title}
              overview={movie.overview}
              showTooltip={true}
              vote_average={movie.vote_average}
              runtime={movie.runtime}
              vote_count={movie.vote_count}
              release_date={getYearFromDate(movie.release_date)}
              genres={getTopGenres(movie.genres)}
              production_countries={getTopProductionCountries(movie.production_countries)}
            >
              <MovieCard
                movie={movie}
                onClick={() => {
                  navigate(`/view-movie/${movie.id}`);
                }}
              />
            </MovieTooltip>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No movies found for "{searchTerm}".
          </p>
        )}
      </div>
    </div>
  );
}
