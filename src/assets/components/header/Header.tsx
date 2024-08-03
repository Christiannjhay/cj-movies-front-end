import { Link } from "react-router-dom";
import Logo from "./logo";
import SearchBar from "./SearchBar";


export default function Header() {
  return (
    <div className="w-100% h-[150px] grid grid-cols-1 bg-black sm:grid-cols-12 sm:h-[100px] ">
      <div className="flex col-span-1 justify-center items-center sm:col-span-3">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center mb-4 justify-center col-span-6 sm:mb-0">
        <SearchBar></SearchBar>
      </div>
      <div className="hidden col-span-3 justify-center items-center sm:flex"></div>
    </div>
  );
}
