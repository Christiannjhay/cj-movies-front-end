import { Link } from "react-router-dom";
import Logo from "../header/logo";
import HomeSearchBar from "./HomeSearchBar";
import { useAuth } from "@/contexts/AuthContext";
import { SheetSide } from "./SheetSide";
import { LoginDialog } from "../LoginDialog/LoginRegisterDialog";
import { Profile } from "./Profile";

export default function HomeHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="w-100% h-[150px] grid grid-cols-1 sm:grid-cols-12 sm:h-[100px]">
      <div className="flex col-span-1 justify-center items-center mt-4 sm:col-span-3 w-full">
        <div className="grid grid-cols-12">
          <div className="col-span-11">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="col-span-1">
            <div className="sm:hidden flex items-center justify-end mt-5">
              <SheetSide />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4 justify-center col-span-6 sm:mb-0">
        <HomeSearchBar />
      </div>
      <div className="hidden mt-8 sm:block 2xl:ml-44 xl:ml-36 lg:ml-28 md:ml-20 sm:ml-10">
        {isAuthenticated ? <Profile/> : <LoginDialog />}
      </div>
    </div>
  );
}
