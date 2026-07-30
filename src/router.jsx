import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import AdminLayout from "./admin/layout/AdminLayout";

import Dashboard from "./admin/pages/Dashboard";
import Messages from "./admin/pages/Messages";
import Trainers from "./admin/pages/Trainers";
import Memberships from "./admin/pages/Memberships";
import Gallery from "./admin/pages/Gallery";
import Testimonials from "./admin/pages/Testimonials";
import Settings from "./admin/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "trainers",
        element: <Trainers />,
      },
      {
        path: "memberships",
        element: <Memberships />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "testimonials",
        element: <Testimonials />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);