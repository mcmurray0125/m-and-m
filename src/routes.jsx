import { createBrowserRouter } from "react-router-dom";

// Layouts
import General from "./layouts/General";

// Pages
import MemoryLane from "./pages/MemoryLane";
import Home from "./pages/Home";

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
        name: "Login",
        element: <MemoryLane />,
      },
    ],
  }
]

const router = createBrowserRouter(routes);

export { routes, router };
