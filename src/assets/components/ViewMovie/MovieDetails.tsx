import { useState, useEffect } from "react";
import { format } from "date-fns";

interface MovieDetails {
  backdrop_path: string;
  title: string;
  overview: string;
  id: number;
  poster_path: string;
}

interface ProductionCompany {
  id: number;
  name: string;
}

interface ProductionCountry {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ReleaseDate {
  date: string;
}

interface Cast {
  id: number;
  name: string;
}

interface MovieDetailsProps {
  movieDetails: MovieDetails | null;
}

interface CrewMember {
  job: string;
  name: string;
}

export default function MovieDetails({ movieDetails }: MovieDetailsProps) {
  const [topProductionCompanies, setTopProductionCompanies] = useState<
    ProductionCompany[]
  >([]);
  const [topProductionCountry, setTopProductionCountry] = useState<
    ProductionCountry[]
  >([]);
  const [topGenre, setTopGenre] = useState<Genre[]>([]);
  const [releaseDate, setReleaseDate] = useState<ReleaseDate[]>([]);
  const [topCast, setTopCast] = useState<Cast[]>([]);
  const [director, setDirector] = useState<string | null>("");

  useEffect(() => {
    const fetchProductionCompanies = async () => {
      if (movieDetails && movieDetails.id) {
        try {
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${
                import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN
              }`,
            },
          };

          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieDetails.id}?language=en-US`,
            options
          );
          const data = await response.json();

          const productionCompanies: ProductionCompany[] =
            data.production_companies;
          const productionCountry: ProductionCountry[] =
            data.production_countries;
          const productionGenre: Genre[] = data.genres;

          const top3ProductionCompanies = productionCompanies.slice(0, 3);
          setTopProductionCompanies(top3ProductionCompanies);

          const top3ProductionCountry = productionCountry.slice(0, 3);
          setTopProductionCountry(top3ProductionCountry);

          const top3Genre = productionGenre.slice(0, 3);
          setTopGenre(top3Genre);

          const formattedReleaseDate = format(
            new Date(data.release_date),
            "MMMM d, yyyy"
          );
          setReleaseDate([{ date: formattedReleaseDate }]);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      } else {
        console.warn("Movie details or ID unavailable for fetching.");
      }

      if (movieDetails && movieDetails.id) {
        try {
          const creditsOptions = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${
                import.meta.env.VITE_REACT_APP_MOVIE_API_TOKEN
              }`,
            },
          };
          const creditsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movieDetails.id}/credits?language=en-US`,
            creditsOptions
          );
          const data = await creditsResponse.json();

          const movieCast: Cast[] = data.cast;

          const director = data.crew.find(
            (member: CrewMember) => member.job === "Director"
          );
          if (director) {
            setDirector(director.name);
          } else {
            setDirector("Unknown");
          }
          const top3Cast = movieCast.slice(0, 3);
          setTopCast(top3Cast);
        } catch (error) {
          console.error("Error fetching credits:", error);
        }
      }
    };

    fetchProductionCompanies();
  }, [movieDetails]);

  return (
    <div className="h-fit justify-start flex-wrap w-full overflow-hidden ml-5">
      <div className="mt-1 text-white text-xs sm:text-base grid grid-cols-12 gap-9">
        <div className="col-span-2 mt-1 text-[#FF3131]">
          <p>Country:</p>
        </div>
        <div className="col-span-10 flex">
          {topProductionCountry.map((country, index) => (
            <div
              key={country.id}
              className={
                index !== topProductionCountry.length - 1 ? "mr-1 mt-1" : "mt-1"
              }
            >
              {country.name}
              {index !== topProductionCountry.length - 1 && ","}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 text-white text-xs sm:text-base grid grid-cols-12 gap-9">
        <div className="col-span-2 mt-1 text-[#FF3131]">
          <p>Genre:</p>
        </div>
        <div className="col-span-10 flex">
          {topGenre.map((genre, index) => (
            <div
              key={genre.id}
              className={index !== topGenre.length - 1 ? "mr-1 mt-1" : "mt-1"}
            >
              {genre.name}
              {index !== topGenre.length - 1 && ","}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 text-white text-xs sm:text-base grid grid-cols-12 gap-9 sm:gap-6">
        <div className="col-span-2 mt-1 text-[#FF3131]">
          <p>Release:</p>
        </div>
        <div className="col-span-10 mt-1 text-[#afafb1]">
          {releaseDate.length > 0 && <p>{releaseDate[0].date}</p>}
        </div>
      </div>
      <div className="mt-1 text-white text-xs sm:text-base grid grid-cols-12 gap-9 sm:gap-6">
        <div className="col-span-2 mt-1 text-[#FF3131]">
          <p>Director:</p>
        </div>
        <div className="col-span-10 mt-1">
          <p>{director}</p>
        </div>
      </div>
      <div className="mt-1 text-white text-xs sm:text-base grid grid-cols-12 gap-9 sm:gap-6">
        <div className="col-span-2 mt-1 text-[#FF3131]">
          <p>Production:</p>
        </div>
        <div className="col-span-10 flex mt-1">
          {topProductionCompanies.map((company, index) => (
            <div
              key={company.id}
              className={
                index !== topProductionCompanies.length - 1
                  ? "mr-1 mt-1"
                  : "mt-1"
              }
            >
              {company.name}
              {index !== topProductionCompanies.length - 1 && ","}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 text-white text-xs sm:text-base grid grid-cols-12 gap-9 sm:gap-6">
        <div className="col-span-2 mt-1 text-[#FF3131]">
          <p>Cast:</p>
        </div>
        <div className="col-span-10 flex mt-1">
          {topCast.map((cast, index) => (
            <div
              key={cast.id}
              className={index !== topCast.length - 1 ? "mr-1 mt-1" : "mt-1"}
            >
              {cast.name}
              {index !== topCast.length - 1 && ","}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
