import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StarIcon2 from "@/icons/StartIcon2";
import TooltipPLayIcon from "@/icons/TooltipPLayIcon";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface MovieTooltipProps {
  children: ReactNode;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  production_countries: string[];
  genres: string[];
  id: number;
}

export default function MovieTooltip({
  children,
  title,
  overview,
  production_countries,
  release_date,
  runtime,
  vote_average,
  genres,
  vote_count,
  id,
}: MovieTooltipProps) {
  const truncateOverview = (text: string, maxLength: number = 140) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const navigate = useNavigate();

  const handleWatchNowClick = () => {
    navigate(`/view-movie/${id}`);
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className="bg-[#26272c] outline-none border-0 text-white flex flex-col h-[330px] w-[310px] p-6"
          side="right"
          align="start"
        >
          <div className="flex flex-col flex-grow">
            <p className="text-lg font-bold">{title}</p>
            <div className="flex">
              <p className="text-red-500 font-medium">{release_date}</p>
              <div className="mt-[2px] ml-2">
                <StarIcon2 />
              </div>
              <p className="ml-1 text-red-500 font-medium">
                {vote_average.toFixed(1)}
              </p>
              <p className="ml-2 text-red-500 font-medium">{runtime} min</p>
            </div>
            <div className="flex flex-col mt-2">
              <div className="flex">
                <p className="text-md">Country:</p>
                <p className="ml-2">
                  {production_countries.slice(0, 3).join(", ")}
                </p>
              </div>
              <div className="flex">
                <p>Genre:</p>
                <p className="ml-2">{genres.slice(0, 3).join(", ")}</p>
              </div>
              <div className="flex">
                <p>Scores:</p>
                <p className="ml-2">
                  {vote_average.toFixed(1)} by {vote_count} reviews
                </p>
              </div>
            </div>
            <p className="mt-3 flex-grow">{truncateOverview(overview)}</p>
          </div>
          <div className="w-full mt-auto">
            <Button
              className="w-full bg-[#FF3131] hover:bg-red-700"
              onClick={handleWatchNowClick}
            >
              <div className="mr-1">
                <TooltipPLayIcon />
              </div>
              Watch now
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
