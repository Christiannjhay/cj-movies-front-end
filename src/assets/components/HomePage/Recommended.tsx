import { useState } from "react";
import RecommendedIcon from "@/icons/RecommendedIcon";
import RecommendedCard from "./RecommendedCard";
import TopDay from "./TopDay";
import TopWeek from "./TopWeek";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Recommended() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("a");

  return (
    <div className="h-fit w-full bg-[#181818]">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-6 text-center">
          <h1 className="text-[#6b6767] mt-10 text-sm px-6 md:text-base">
            If you enjoy the website, please consider sharing it with your
            friends. Thank you!
          </h1>
        </div>
      </div>

      <div className="text-white text-2xl font-bold ml-10 flex">
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
            <RecommendedCard />
          </div>
          <div className="2xl:col-span-3 xl:col-span-4 lg:col-span-4 ">
            <div className="text-white text-2xl font-bold ml-10 flex">
              <div className="h-7 w-5 bg-red-500 rounded-sm text-white mt-4">
                <div className="mt-4 ml-[2px]">
                  <RecommendedIcon />
                  
                </div>
              </div>
              <div className="flex flex-col mr-10">
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