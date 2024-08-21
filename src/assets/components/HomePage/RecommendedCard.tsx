import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieTooltip from "../MovieTooltip";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  production_countries: { name: string }[];
  genres: { id: number; name: string }[];
}

export default function RecommendedCard() {
  const [, setMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [longPressMovie, setLongPressMovie] = useState<Movie | null>(null);

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

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results);

        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];
        const randomMovieId = randomMovie.id;

        const recommendationsUrl = `https://api.themoviedb.org/3/movie/${randomMovieId}/recommendations?language=en-US&page=2`;
        const recommendationsResponse = await fetch(recommendationsUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!recommendationsResponse.ok) {
          throw new Error(
            `HTTP error! Status: ${recommendationsResponse.status}`
          );
        }

        const recommendationsData = await recommendationsResponse.json();

        const detailedRecommendations = await Promise.all(
          recommendationsData.results.map(async (movie: { id: number }) => {
            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`;
            const movieDetailsResponse = await fetch(movieDetailsUrl, {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
            });

            if (!movieDetailsResponse.ok) {
              throw new Error(
                `HTTP error! Status: ${movieDetailsResponse.status}`
              );
            }

            const movieDetails = await movieDetailsResponse.json();
            return movieDetails;
          })
        );

        setRecommendations(detailedRecommendations);
      } catch (error) {
        console.error("Error fetching movies or recommendations:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleLongPressStart = useCallback((movie: Movie) => {
    setIsLongPressing(true);
    setLongPressMovie(movie);
  }, []);

  const handleLongPressEnd = useCallback(() => {
    setIsLongPressing(false);
    setLongPressMovie(null);
  }, []);

  const getYearFromDate = (date: string) => {
    return date.split("-")[0];
  };

  const getTopGenres = (genres: { id: number; name: string }[]) => {
    return genres.slice(0, 3).map((genre) => genre.name);
  };

  return (
    <div className="p-auto mr-4 mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
        {recommendations.map((movie) => (
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
            production_countries={movie.production_countries
              .map((country) => country.name)
              .slice(0, 3)}
          >
            <div
              onTouchStart={() => handleLongPressStart(movie)}
              onTouchEnd={handleLongPressEnd}
              className="relative lg:block"
            >
              <MovieCard
                movie={movie}
                onClick={() => {
                  navigate(`/view-movie/${movie.id}`);
                }}
              />
            </div>
          </MovieTooltip>
        ))}
      </div>

      {/* Long Press Popup */}
      {isLongPressing && longPressMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full text-center">
            <h3 className="text-lg font-semibold">{longPressMovie.title}</h3>
            <p className="mt-2">{longPressMovie.overview}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => {
                // Add movie to bookmarks logic
                handleLongPressEnd(); // Close the popup
              }}
            >
              Add to Bookmarks
            </button>
            <button
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
              onClick={handleLongPressEnd}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
