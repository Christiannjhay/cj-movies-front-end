import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieTitle from "./MovieTitle";
import MovieOverview from "./MovieOverview";

interface MoviePlayerProps {
  setMovieDetails: React.Dispatch<React.SetStateAction<MovieDetails | null>>;
}

interface MovieDetails {
  backdrop_path: string;
  title: string;
  overview: string;
  id: number;
  poster_path: string;
  runtime: number;
  vote_average: number;
  release_date: string;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({ setMovieDetails }) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetailsLocal] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${
              import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN
            }`,
          },
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          options
        );

        const movieData: MovieDetails = await response.json();
       
        setMovieDetailsLocal(movieData);
        setMovieDetails(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, setMovieDetails]);

  const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`;
  

  return (
    <div className="w-full relative">
      <div
        className="flex justify-center content-center bg-cover bg-no-repeat h-[300px] sm:h-[500px] md:h-[600px] lg:h-[850px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba( 0, 0, 0, 0.92)), url(${backdropUrl})`,
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center">
        <iframe
          className="mt-6 h-[90%] w-11/12"
          width="70%"
          height="700"
          src={`https://vidsrc.to/embed/movie/${id}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Movie"
        />
        <div className="hidden">
            <MovieTitle movieDetails={movieDetails} />
            <MovieOverview movieDetails={movieDetails} />
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;

