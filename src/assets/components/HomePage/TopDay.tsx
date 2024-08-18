import { Card } from "@/components/ui/card";
import StarIcon3 from "@/icons/StarIcon3";
import { useNavigate } from "react-router-dom";

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

interface TopDayProps {
  movies: Movie[];
}

export default function TopDay({ movies }: TopDayProps) {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/view-movie/${id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-2 mt-6 ">
      {movies.map((movie, index) => (
        <Card
          key={movie.id}
          className="border-none shadow-none bg-transparent cursor-pointer"
          onClick={() => handleCardClick(movie.id)}
        >
          <div className="flex h-20 bg-[#0F0F0F] rounded-2xl overflow-hidden hover:bg-red-500 transition duration-300 ease-in-out group">
            <div className="absolute">
              <div>
                <h1 className="absolute top-10 left-0 flex items-center justify-center w-8 h-8 bg-[#0F0F0F] rounded-full text-red-500 group-hover:text-white group-hover:bg-red-500 font-bold text-lg transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 border-2 border-red-500">
                  {index + 1}
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-12 w-full">
              <div className="col-span-2 h-full">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-10 p-4">
                <h2 className="text-sm text-red-500 font-semibold group-hover:text-white transition duration-300 ease-in-out">
                  {movie.title}
                </h2>
                <div className="flex flex-row">
                  <p className="text-sm font-normal text-gray-600 group-hover:text-black transition duration-300 ease-in-out">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                  <p className="ml-2 text-sm font-normal flex text-gray-600 group-hover:text-black transition duration-300 ease-in-out">
                    <div className="mr-1">
                      <StarIcon3 />
                    </div>
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
