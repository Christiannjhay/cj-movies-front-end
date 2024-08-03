import RecommendedIcon from "@/icons/RecommendedIcon";
import RecommendedCard from "./RecommendedCard";

export default function Recommended() {
  return (
    <div className="h-fit w-full bg-[#181818] ">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-6 text-center">
          <h1 className="text-[#6b6767] mt-10">
            If you enjoy the website, please consider sharing it with your
            friends. Thank you!
          </h1>
        </div>
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
        <RecommendedCard />
      </div>
    </div>
  );
}
