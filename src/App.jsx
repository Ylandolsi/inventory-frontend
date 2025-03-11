import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Books } from "./pages/Books";
import { Authors } from "./pages/Authors";
import { Genres } from "./pages/Genres";
import { NotFound } from "./pages/NotFound";
import { RootLayout } from "./layouts/RootLayout";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="Books" element={<Books />} />
      <Route path="Authors" element={<Authors />} />
      <Route path="Genres" element={<Genres />} />

      {/* <Route
        path=":id"
        element={<CareerDetails />}
        loader={careerDetailsLoader}
      /> */}

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
