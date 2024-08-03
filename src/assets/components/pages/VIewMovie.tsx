import { useState, useEffect } from "react";
import MoviePlayer from "../ViewMovie/MoviePlayer";
import MovieTitle from "../ViewMovie/MovieTitle";
import MovieOverview from "../ViewMovie/MovieOverview";
import MovieDetails from "../ViewMovie/MovieDetails";

import ViewMovieRecommended from "../ViewMovie/ViewMovieRecommended";

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

export default function ViewMovie() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-[#181818] min-h-screen flex flex-col w-full">
      <div className="">
        <MoviePlayer setMovieDetails={setMovieDetails} />
      </div>
      <div className="relative h-max flex-grow-1">
        <div className="flex flex-wrap justify-center">
          <div className=" rounded-2xl mt-4 mb-4 w-[1300px] grid grid-cols-12">
            <div className="hidden col-span-3 sm:block m-2">
              <div className="mr-4]">
                {movieDetails?.poster_path ? (
                  <img
                    className="mb-4 rounded-2xl"
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt="Movie Poster"
                  />
                ) : (
                  <p>PICTURE (Placeholder if needed)</p>
                )}
              </div>
            </div>
            <div className="col-span-9 flex flex-col ">
              <div className="flex justify-start m-2 ">
                <MovieTitle movieDetails={movieDetails} />
              </div>
              <div className="flex justify-center m-0 sm:m-2">
                <MovieOverview movieDetails={movieDetails} />
              </div>
              <div className="flex m-2 ">
                <MovieDetails movieDetails={movieDetails} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewMovieRecommended/>
    </div>
  );
}
