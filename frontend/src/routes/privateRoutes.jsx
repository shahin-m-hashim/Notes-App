import { Suspense, lazy } from "react";
import PrivateLayout from "layouts/PrivateLayout";

const ErrorPage = lazy(() => import("pages/ErrorPage"));
const HomePage = lazy(() => import("pages/private/HomePage"));

const privateRoutes = [
  {
    path: "/",
    element: <PrivateLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
];

export default privateRoutes;
