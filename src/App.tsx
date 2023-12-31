import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LayoutPage from "./pages/Layout";
import LandingPage from "./pages/Landing";
import FormPage from "./pages/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "form",
        element: <FormPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
