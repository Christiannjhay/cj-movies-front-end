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
  const searchTerm = new URLSearchParams(location.search).get("query") || '';;
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN
        }`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  }, [searchTerm]);

  const getYearFromDate = (date: string) => {
    return date.split("-")[0];
  };

  const getTopGenres = (genres: { id: number; name: string }[] | undefined) => {
    if (!genres || !Array.isArray(genres)) {
      return [];
    }
    return genres.slice(0, 3).map((genre) => genre.name);
  };

  return (
    <div className="p-7 bg-[#181818] w-full">
      <h2 className="text-xl font-bold text-white mb-4">
        <div className="flex flex-row">
          <div className="">
            <RecommendedIcon2/>
          </div>
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
              vote_average={movie.vote_average}
              runtime={movie.runtime}
              vote_count={movie.vote_count}
              release_date={getYearFromDate(movie.release_date)}
              genres={getTopGenres(movie.genres)}
              production_countries={(movie.production_countries || [])
                .map((country: { name: string }) => country.name)
                .slice(0, 3)}
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
