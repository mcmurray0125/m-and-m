import { createBrowserRouter } from "react-router-dom";

// Layouts
import General from "./layouts/General";

// Pages
import Home from "./pages/Home";
import MemoryLane from "./pages/MemoryLane";
import Memory from "./pages/Memory";

const routes = [
  {
    path: "/",
    routeName: "general",
    element: <General />,
    children: [
      {
        path: "/",
        name: "Home",
        element: <Home />,
      },
      {
        path: "/memory-lane",
        name: "Memory Lane",
        element: <MemoryLane />,
      },
      {
        path: "/memory/:id",
        name: "Memory",
        element: <Memory />,
      },
    ],
  }
]

const router = createBrowserRouter(routes);

export { routes, router };
