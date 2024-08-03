import StarIcon from "@/icons/StarIcon";

interface MovieDetails {
  backdrop_path: string;
  title: string;
  overview: string;
  runtime: number;
  vote_average: number;
  release_date: string;
}

interface MovieOverviewProps {
  movieDetails: MovieDetails | null;
}

const formatVoteAverage = (voteAverage: number | undefined): string => {
  if (voteAverage === undefined) {
    return "";
  }
  return voteAverage.toFixed(1);
};

const getYearFromDate = (dateString: string | undefined): string => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "";
  }

  return date.getFullYear().toString();
};

export default function MovieOverview({ movieDetails }: MovieOverviewProps) {
  return (
    <div className="h-fit flex justify-center flex-wrap flex-col">
      <div className="flex flex-row ml-5">
      <div className="text-yellow-300 size-1 mr-4 sm:size-4 sm:mr-2">
          <StarIcon />
        </div>
        <h1 className="text-white ml-1 text-xs sm:text-base">
          {formatVoteAverage(movieDetails?.vote_average)}
        </h1>
        <h1 className="text-white ml-2 text-xs sm:text-base">
          {getYearFromDate(movieDetails?.release_date)}
        </h1>
        <h1 className="text-white ml-2 text-xs sm:text-base">{movieDetails?.runtime}</h1>
        <h1 className=" text-white ml-1 text-xs sm:text-base">min</h1>
        
      </div>

      <h1 className="text-slate-300 text-xs sm:text-base font-light ml-5 mt-4">
        {movieDetails?.overview}
      </h1>
    </div>
  );
}
