import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./assets/components/header/Header";
import HomePage from "./assets/components/pages/HomePage";
import ViewMovie from "./assets/components/pages/VIewMovie";
import SearchResult from "./assets/components/pages/SearchResults";
import { AuthProvider } from "@/contexts/AuthContext";
import Bookmarks from "./assets/components/pages/Bookmarks";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    ),
  },
  {
    path: "/view-movie/:id",
    element: (
      <>
        <AuthProvider>
          <Header />
          <ViewMovie />
        </AuthProvider>
      </>
    ),
  },
  {
    path: "/search-results",
    element: (
      <>
        <AuthProvider>
          <Header />
          <SearchResult />
        </AuthProvider>
      </>
    ),
  },
  {
    path: "/bookmarks",
    element: (
      <>
        <AuthProvider>
          <Header />
          <Bookmarks />
        </AuthProvider>
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className=" w-100% min-h-screen h-full bg-[#181818]">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
