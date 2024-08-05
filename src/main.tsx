import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./assets/components/header/Header";
import HomePage from "./assets/components/pages/HomePage";
import ViewMovie from "./assets/components/pages/VIewMovie";
import SearchResult from "./assets/components/pages/SearchResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <HomePage />
      </>
    ),
  },
  {
    path: "/view-movie/:id",
    element: (
      <>
        <Header/>
        <ViewMovie />
      </>
    ),
  },
  {
    path: "/search-results",
    element: (
      <>
        <Header />
        <SearchResult />
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
