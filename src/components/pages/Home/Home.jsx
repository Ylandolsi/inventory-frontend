import { Plus } from "lucide-react";
import "./Home.scss";
import { NavLink } from "react-router-dom";
import { BookContext } from "@/components/Contexts/BookContext";
import { useContext } from "react";
import { AuthorContext } from "@/components/Contexts/AuthorContext";
import { GenreContext } from "@/components/Contexts/GenreContext";

export function Home() {
  const { Books } = useContext(BookContext);
  const { authors } = useContext(AuthorContext);
  const { genres } = useContext(GenreContext);

  console.log(Books, authors, genres);

  const bookCount = Books ? Books.length : 0;
  const authorCount = authors ? authors.length : 0;
  const genreCount = genres ? genres.length : 0;
  console.log("Book Count: ", bookCount);
  console.log("Author Count: ", authorCount);
  console.log("Genre Count: ", genreCount);

  return (
    <main className="flex flex-col gap-5 items-center m-5 p-10 border rounded-lg">
      <h1 className="WelcomeHome">Welcome to the Bookstore Inventory</h1>
      <p
        style={{
          fontWeight: 200,
          opacity: 0.8,
        }}
      >
        This is a simple app to manage your bookstore inventory.
      </p>
      <div className="mt-5 w-full flex flex-row justify-center items-center gap-10 flex-wrap">
        <NavLink to="/books" className="HoverHome">
          <p className="text-2xl font-bold">Books</p>
          <div className="text-3xl font-bold">{bookCount}</div>
          <div className="font-thin">Total in inventory</div>
        </NavLink>
        <NavLink to="/authors" className="HoverHome">
          <p className="text-2xl font-bold">Authors</p>
          <div className="text-3xl font-bold">{authorCount}</div>
          <div className="font-thin">Total in inventory</div>
        </NavLink>
        <NavLink to="/genres" className="HoverHome">
          <p className="text-2xl font-bold">Genres</p>
          <div className="text-3xl font-bold">{genreCount}</div>
          <div className="font-thin">Total in inventory</div>
        </NavLink>
      </div>

      <section className="flex flex-col gap-4 w-full mt-3">
        <h2 className="font-bold text-2xl mr-auto">Quick Actions</h2>
        <div className="flex flex-row gap-4 flex-wrap">
          <NavLink to="/books/add" className="HoverHomeActions">
            <Plus />
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold">Add New Book</div>
              <div className="text-sm">Add a new book to inventory</div>
            </div>
          </NavLink>
          <NavLink to="/authors/add" className="HoverHomeActions">
            <Plus />
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold">Add New Author</div>
              <div className="text-sm">Add a new author profile</div>
            </div>
          </NavLink>
          <NavLink to="/genres/add" className="HoverHomeActions">
            <Plus />
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold">Add New Genre</div>
              <div className="text-sm">Create a new book genre</div>
            </div>
          </NavLink>
        </div>
      </section>
    </main>
  );
}
