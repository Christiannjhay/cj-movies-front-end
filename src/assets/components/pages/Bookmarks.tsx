import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../HomePage/MovieCard";
import MovieTooltip from "../MovieTooltip";
import RecommendedIcon2 from "@/icons/RecommendedIcon2";
import { useAuth } from "@/contexts/AuthContext";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: string;
  vote_count: number;
  production_countries: string[];
  genres: string[];
}

export default function Bookmarks() {
  const { isAuthenticated } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return; 

    const fetchBookmarkedMovies = async () => {
      try {
        const response = await fetch('https://cj-movies-backend.vercel.app/bookmarked-movies', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (response.ok) {
          setMovies(data.movies);
        } else {
          console.error('Error fetching user-bookmarked movies:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user-bookmarked movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedMovies();
  }, [isAuthenticated]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-7 bg-[#181818] w-full">
      <h2 className="text-xl font-bold text-white mb-4">
        <div className="flex flex-row items-center">
          <RecommendedIcon2 />
          <div className="mt-3 ml-2">BOOKMARKS</div>
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
              vote_average={parseFloat(movie.vote_average)}
              runtime={movie.runtime}
              vote_count={movie.vote_count}
              release_date={new Date(movie.release_date).getFullYear().toString()}
              genres={movie.genres}
              production_countries={movie.production_countries}
            >
              <MovieCard
                movie={movie}
                onClick={() => navigate(`/view-movie/${movie.id}`)}
              />
            </MovieTooltip>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No bookmarked movies found.
          </p>
        )}
      </div>
    </div>
  );
}
