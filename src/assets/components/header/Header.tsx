import { Link } from "react-router-dom";
import Logo from "./logo";
import SearchBar from "./SearchBar";
import {Profile} from "../HomePage/Profile";
import { LoginDialog } from "../LoginDialog/LoginRegisterDialog";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { isAuthenticated } = useAuth();

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
      <div className="hidden mt-8 sm:block 2xl:ml-44 xl:ml-36 lg:ml-28 md:ml-20 sm:ml-10">
        {isAuthenticated ? <Profile/> : <LoginDialog />}
      </div>
    </div>
  );
}
