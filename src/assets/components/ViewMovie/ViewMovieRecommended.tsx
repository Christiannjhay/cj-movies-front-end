import RecommendedIcon from "@/icons/RecommendedIcon";
import ViewMovieRecommendedCard from "./ViewMovieRecommendedCard";
import Top9Card from "../HomePage/Top9Card";

export default function ViewMovieRecommended() {
  return (
    <div className="h-fit w-full bg-[#181818] ">
      <div className="flex flex-col justify-center items-center">
      </div>

      <div className="text-white text-2xl font-bold ml-10 flex ">
        <div className="h-7 w-5 bg-red-500 rounded-sm text-white items-center justify-center mt-4">
          <div className="mt-[7px] ml-[2px]">
            <RecommendedIcon />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="ml-1 mt-3 tracking-widest">RECOMMENDED</h1>
        </div>
      </div>

      <div className="ml-5">
        <div className="flex flex-col lg:grid lg:grid-cols-12">
          <div className="lg:col-span-9">
            <ViewMovieRecommendedCard />
          </div>
          <div className="lg:col-span-3">
            <div className="text-white text-2xl font-bold ml-10 flex ">
              <div className="h-7 w-5 bg-red-500 rounded-sm text-white items-center justify-center mt-4">
                <div className="mt-[7px] ml-[2px]">
                  <RecommendedIcon />
                </div>
              </div>
              <div className="flex flex-col mr-20">
                <h1 className="ml-1 mt-3 tracking-widest">TOP10</h1>
                <Top9Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
