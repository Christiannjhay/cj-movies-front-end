
import Recommended from "../HomePage/Recommended";
import TrendingMoviesCard from "../HomePage/TrendingMoviesCard";

export default function HomePage() {

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-center items-center relative"></div>
      <div className="flex flex-col">
        
        <TrendingMoviesCard />
        <div className="w-screen mt-40">
          <Recommended/>
        </div>
      </div>
    </div>
  );
}
