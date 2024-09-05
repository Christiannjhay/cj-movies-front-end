import HomeHeader from "../HomePage/HomeHeader";
import MainCarousel from "../HomePage/MainCarousel";
import Recommended from "../HomePage/Recommended";
import SecondCarousel from "../HomePage/SecondCarousel";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <div className="flex justify-center items-center absolute top-0 left-0 w-full z-50">
        <HomeHeader />
      </div>

      <div className="relative w-full">
        <div className="relative z-10">
          <MainCarousel />
        </div>
        <div className="md:relative sm:relative relative top-5 sm:left-10 left-5 w-screen h-fit z-20 lg:absolute lg:top-[510px] xl:top-[550px] 2xl:top-[685px]">
          <SecondCarousel />
        </div>
      </div>
      <div className="flex lg:mt-48 xl:mt-32 2xl:mt-0">
        <Recommended />
      </div>
    </div>
  );
}
