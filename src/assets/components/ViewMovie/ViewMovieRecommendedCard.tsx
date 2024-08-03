import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "../HomePage/MovieCard";
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

export default function ViewMovieRecommendedCard() {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRecommendations = async () => {
      const apiKey = import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN;

      try {
        const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
        const recommendationsResponse = await fetch(recommendationsUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!recommendationsResponse.ok) {
          throw new Error(`HTTP error! Status: ${recommendationsResponse.status}`);
        }

        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData.results || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (id) {
      fetchRecommendations();
    }
  }, [id]);

  const getYearFromDate = (date: string) => {
    return date.split("-")[0];
  };

  const getTopGenres = (genres: { id: number; name: string }[] = []) => {
    return genres.slice(0, 3).map((genre) => genre.name);
  };

  const getTopCountries = (countries: { name: string }[] = []) => {
    return countries.slice(0, 3).map((country) => country.name);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
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
            production_countries={getTopCountries(movie.production_countries)}
          >
            <MovieCard
              movie={movie}
              onClick={() => {
                navigate(`/view-movie/${movie.id}`);
                window.scrollTo(0, 0);
              }}
            />
          </MovieTooltip>
        ))}
      </div>
    </div>
  );
}
