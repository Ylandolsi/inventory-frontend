import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Home } from "./pages/Home/Home.jsx";
import { Books, BooksLoader } from "./pages/Get/Book/Books.jsx";
import { Authors, AuthorsLoader } from "./pages/Get/Author/Authors.jsx";
import { Genres, GenresLoader } from "./pages/Get/Genre/Genres.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { RootLayout } from "./layouts/RootLayout.jsx";
import { AddBook, addBookLoader } from "./pages/Add/Book/AddBook.jsx";
import { AddAuthor } from "./pages/Add/Author/AddAuthor.jsx";
import { BooksLayout } from "./layouts/BooksLayout.jsx";
import { AuthorsLayout } from "./layouts/AuthrosLayout.jsx";
import { GenresLayout } from "./layouts/GenresLayout.jsx";
import { AddGenre } from "./pages/Add/Genre/AddGenre.jsx";
import { Error } from "./pages/Error.jsx";
import { EditBook, EditBookLoader } from "./pages/Edit/Book/EditBook.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="books" element={<BooksLayout />}>
        <Route index element={<Books />} loader={BooksLoader} />
        <Route path="add" element={<AddBook />} loader={addBookLoader} />
        <Route path="edit/:id" element={<EditBook />} loader={EditBookLoader} />
      </Route>
      <Route path="authors" element={<AuthorsLayout />}>
        <Route index element={<Authors />} loader={AuthorsLoader} />
        <Route path="add" element={<AddAuthor />} />
      </Route>
      <Route path="genres" element={<GenresLayout />}>
        <Route index element={<Genres />} loader={GenresLoader} />
        <Route path="add" element={<AddGenre />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
