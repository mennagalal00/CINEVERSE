import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:id", element: <MovieDetails /> },
      {
        path: "favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "watchlist",
        element: (
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2500}
        toastStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
      />
    </>
  );
}

export default App;
