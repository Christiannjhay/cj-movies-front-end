import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define the props type for the Register component
interface RegisterProps {
  email: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

function Register({ email, setUsername, password, setPassword }: RegisterProps) {
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="bg-[#181818] border-none">
      <CardHeader>
        <CardTitle className="text-white">Sign up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="username" className="text-white">
            Email
          </Label>
          <Input
            id="username"
            type="text"
            className="bg-[#27272A] text-white rounded-2xl border-[#FF3131] focus:border-2"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            className="bg-[#27272A] text-white rounded-2xl border-[#FF3131] focus:border-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="bg-[#FF3131] text-white w-full rounded-2xl hover:bg-red-600 hover:text-white"
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}

export function LoginDialog() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border-2 text-md border-[#FF3131] text-white font-semibold rounded-2xl hover:bg-red-800 hover:text-white"
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-[90%] sm:max-w-[425px] bg-[#181818] border-none">
        <Tabs defaultValue="account" className="w-full sm:w-[375px] bg-[#181818]">
          <TabsList className="grid w-[90%] sm:w-[330px] ml-5 grid-cols-2 bg-[#27272A] rounded-2xl">
            <TabsTrigger value="account" className="rounded-2xl">Login</TabsTrigger>
            <TabsTrigger value="password" className="rounded-2xl">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="bg-[#181818] border-none">
              <CardHeader>
                <CardTitle className="text-white">Login</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username" className="text-white font-regular">Email</Label>
                  <Input
                    id="loginUsername"
                    className="bg-[#27272A] text-white rounded-2xl border-[#FF3131] focus:border-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-white font-regular">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    className="bg-[#27272A] text-white rounded-2xl border-[#FF3131] focus:border-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-[#FF3131] text-white hover:bg-red-600 w-full rounded-2xl"
                  onClick={() => alert('Login functionality not implemented yet')}
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Register
              email={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
