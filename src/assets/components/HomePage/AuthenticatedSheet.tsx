import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthenticatedSheet() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-12 content-center">
        <div className="col-span-2 bg-red-500">
          <Avatar>
            <AvatarImage 
              src="https://github.com/shadcn.png" 
              alt={user?.username || 'User'}
            />
            <AvatarFallback>{user?.username?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </div>
        <div className="col-span-10 bg-red-300 flex items-center justify-start">
          <h1 className="ml-2">{isAuthenticated ? `${user?.username}` : 'Please log in'}</h1>
        </div>
      </div>
    </div>
  );
}
