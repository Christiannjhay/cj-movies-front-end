import RecommendedIcon from "@/icons/RecommendedIcon";
import ViewMovieRecommendedCard from "./ViewMovieRecommendedCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import TopDay from "../HomePage/TopDay";
import TopWeek from "../HomePage/TopWeek";

export default function ViewMovieRecommended() {

  const [selectedPeriod, setSelectedPeriod] = useState<string>("a");

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
          <div className="2xl:col-span-9 xl:col-span-8 lg:col-span-8">
            <ViewMovieRecommendedCard/>
          </div>
          <div className="2xl:col-span-3 xl:col-span-4 lg:col-span-4">
            <div className="text-white text-2xl font-bold ml-10 flex">
              <div className="h-7 w-5 bg-red-500 rounded-sm text-white items-center justify-center mt-4">
                <div className="mt-[7px] ml-[2px]">
                  <RecommendedIcon />
                </div>
              </div>
              <div className="flex flex-col mr-20">
                <div className="flex flex-row">
                  <h1 className="ml-1 mt-3 tracking-widest">TOP10</h1>
                  <div className="ml-10 mt-3">
                    <ToggleGroup
                      type="single"
                      value={selectedPeriod}
                      onValueChange={setSelectedPeriod}
                    >
                      <ToggleGroupItem value="a">Day</ToggleGroupItem>
                      <ToggleGroupItem value="b">Week</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
                <div className="">
                  {selectedPeriod === "a" ? <TopDay /> : <TopWeek />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
