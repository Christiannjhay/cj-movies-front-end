import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MenubarSeparator } from "@/components/ui/menubar";
import { useAuth } from "@/contexts/AuthContext";
import LogoutIcon from "@/icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AuthenticatedSheet() {
const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await fetch("https://api.movies.cejs.site/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Logged out successfully!");
        setTimeout(() => {
          navigate(`/`);
          window.location.reload();
        }, 500);
      } else {
        toast.error("Logout failed: " + data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-12 content-center">
        <div className="col-span-2 ">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={user?.username || "User"}
            />
            <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>
        <div className="col-span-10 flex items-center justify-start">
          <h1 className="ml-2 text-white font-semibold text-lg">
            {isAuthenticated ? `${user?.username}` : "Please log in"}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-start mt-5">
        <div className="text-white font-extralight">
          <h1>Edit Profile</h1>
        </div>
        <div className="mt-2 text-white font-extralight" onClick={() => {
              navigate(`/bookmarks`);
            }}>
          <h1>Bookmarks</h1>
        </div>

        <div className="w-full mt-2">
          <MenubarSeparator />
          <div className="w-full mt-2">
            <Button className="w-full rounded-lg" onClick={handleLogout}>
              <div className="flex">
                    <div className="font-normal">
                        Logout
                    </div>
                    <div className="mt-[3px] ml-2">
                        <LogoutIcon/>
                    </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
