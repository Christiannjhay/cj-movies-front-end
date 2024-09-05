import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../HomePage/MovieCard";
import RecommendedIcon2 from "@/icons/RecommendedIcon2";
import { useAuth } from "@/contexts/AuthContext";
import BookmarkTooltip from "../Bookmarks/BookmarkTooltip";

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
        const response = await fetch(
          "https://api.movies.cejs.site/bookmarked-movies",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();

        if (response.ok) {
          setMovies(data.movies);
        } else {
          console.error("Error fetching user-bookmarked movies:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user-bookmarked movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedMovies();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#181818]">
        <svg
          className="animate-spin h-10 w-10 text-white"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V2.5"
          ></path>
        </svg>
      </div>
    );
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
            <BookmarkTooltip
              id={movie.id}
              key={movie.id}
              title={movie.title}
              overview={movie.overview}
              showTooltip={true}
              vote_average={parseFloat(movie.vote_average)}
              runtime={movie.runtime}
              vote_count={movie.vote_count}
              release_date={new Date(movie.release_date)
                .getFullYear()
                .toString()}
              genres={movie.genres}
              production_countries={movie.production_countries}
            >
              <MovieCard
                movie={movie}
                onClick={() => navigate(`/view-movie/${movie.id}`)}
              />
            </BookmarkTooltip>
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
