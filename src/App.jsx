import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Home } from "./components/pages/Home/Home.jsx";

import { NotFound } from "./components/pages/NotFound.jsx";
import { Error } from "./components/pages/Error.jsx";

// Fetch
import { Books } from "./components/pages/Get/Book/Books.jsx";
import { Authors } from "./components/pages/Get/Author/Authors.jsx";
import { Genres } from "./components/pages/Get/Genre/Genres.jsx";

// Layouts
import { RootLayout } from "./layouts/RootLayout.jsx";
import { BooksLayout } from "./layouts/BooksLayout.jsx";
import { AuthorsLayout } from "./layouts/AuthrosLayout.jsx";
import { GenresLayout } from "./layouts/GenresLayout.jsx";

// Add
import { AddBook } from "./components/pages/Add/Book/AddBook.jsx";
import { AddAuthor } from "./components/pages/Add/Author/AddAuthor.jsx";
import { AddGenre } from "./components/pages/Add/Genre/AddGenre.jsx";

// Edit
import {
  EditBook,
  EditBookLoader,
} from "./components/pages/Edit/Book/EditBook.jsx";

import {
  EditAuthor,
  EditAuthorLoader,
} from "./components/pages/Edit/Author/EditAuthor.jsx";
import {
  EditGenre,
  EditGenreLoader,
} from "./components/pages/Edit/Genre/EditGenre.jsx";

// Contexts
import { GenreProvider } from "./components/Contexts/GenreContext.jsx";
import { AuthorProvider } from "./components/Contexts/AuthorContext.jsx";
import { BookProvider } from "./components/Contexts/BookContext.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="books" element={<BooksLayout />}>
        <Route index element={<Books />} />
        <Route path="add" element={<AddBook />} />
        <Route path="edit/:id" element={<EditBook />} loader={EditBookLoader} />
      </Route>
      <Route path="authors" element={<AuthorsLayout />}>
        <Route index element={<Authors />} />
        <Route path="add" element={<AddAuthor />} />
        <Route
          path="edit/:id"
          element={<EditAuthor />}
          loader={EditAuthorLoader}
        />
      </Route>
      <Route path="genres" element={<GenresLayout />}>
        <Route index element={<Genres />} />
        <Route path="add" element={<AddGenre />} />
        <Route
          path="edit/:id"
          element={<EditGenre />}
          loader={EditGenreLoader}
        ></Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <BookProvider>
      <GenreProvider>
        <AuthorProvider>
          <RouterProvider router={router} />
        </AuthorProvider>
      </GenreProvider>
    </BookProvider>
  );
}

export default App;
