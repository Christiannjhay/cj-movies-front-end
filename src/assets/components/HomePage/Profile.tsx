import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Toaster } from "@/components/ui/sonner";
import BookmarkIcon from "@/icons/BookmarkIcon";
import EditIcon from "@/icons/EditIcon";
import LogoutIcon from "@/icons/LogoutIcon";
import UserIcon from "@/icons/UserIcon";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function Profile() {
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
    <Menubar className="bg-transparent outline-none border-0">
      <Toaster richColors />
      <MenubarMenu>
        <MenubarTrigger className="bg-transparent">
          <UserIcon />
        </MenubarTrigger>
        <MenubarContent className="bg-[#26272c] outline-none border-0">
          <MenubarItem className="text-white">
            Edit Profile{" "}
            <MenubarShortcut>
              <EditIcon />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem
            className="text-white"
            onClick={() => {
              navigate(`/bookmarks`);
            }}
          >
            Bookmark{" "}
            <MenubarShortcut>
              <BookmarkIcon />
            </MenubarShortcut>
          </MenubarItem>

          <MenubarSeparator />
          <MenubarItem className="text-white" onClick={handleLogout}>
            Logout{" "}
            <MenubarShortcut>
              <LogoutIcon />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
