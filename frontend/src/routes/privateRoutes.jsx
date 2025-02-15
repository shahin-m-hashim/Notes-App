import { Suspense, lazy } from "react";
import NotesPage from "pages/private/NotesPage";
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
      {
        path: "notes",
        element: (
          <Suspense>
            <NotesPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default privateRoutes;
