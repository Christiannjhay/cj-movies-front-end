"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import Menu from "@/icons/Menu";
import { LoginDialog } from "../LoginDialog/LoginRegisterDialog";
import AuthenticatedSheet from "./AuthenticatedSheet";

export function SheetSide() {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger><Menu/></SheetTrigger>
        <SheetContent className="bg-[#181818]">
          <SheetHeader>
            <SheetTitle className="text-white">Menu</SheetTitle>
            {isAuthenticated ? <AuthenticatedSheet/> : <LoginDialog />}
            
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
