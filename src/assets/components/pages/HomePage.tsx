
import TrendingMoviesCard from "../HomePage/TrendingMoviesCard";

export default function HomePage() {

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-center items-center relative"></div>
      <div className="flex">
        <TrendingMoviesCard />
      </div>
    </div>
  );
}
