import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./AddBook.scss";
import { AddAuthor } from "../Author/AddAuthor";
import { AddGenre } from "../Genre/AddGenre";

export function AddBook() {
  const { authors, genres } = useLoaderData();

  // Use array destructuring
  const [NewGenre, setNewGenre] = useState(false);
  const [NewAuthor, setNewAuthor] = useState(false);

  const ToggleNewGenre = () => {
    console.log("toggle");
    setNewGenre(!NewGenre);
  };
  const ToggleNewAuthor = () => {
    setNewAuthor(!NewAuthor);
  };

  return (
    <div className="bookaddform">
      <div className="flex flex-col px-6">
        <p className="AddNewTitle"> Add New Book</p>
        <div className="boxform gap-2 ">
          <p className="smallHeader">Book Details </p>
          <div className="flex flex-col gap-3">
            <label htmlFor="bookTitle" className="text-lg font-[500]">
              Book Title:
            </label>
            <input
              required
              id="bookTitle"
              name="bookTitle"
              className="p-2 w-full md:w-2/3 lg:w-1/2 "
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="bookDescription" className="text-lg font-[500]">
              Description:
            </label>
            <textarea
              id="bookDescription"
              name="bookDescription"
              className="p-2 w-full  h-40"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="bookQuantity" className="text-lg font-[500]">
              Quantity:
            </label>
            <input
              required
              id="bookQuantity"
              name="bookQuantity"
              className="p-2"
            />
          </div>

          <div className="header link">
            <p className="smallHeader">Genre</p>
            <div className="addNewGenre" onClick={ToggleNewGenre}>
              Add New Genre
            </div>
          </div>

          {NewGenre && <AddGenre style={{ marginBottom: "20px" }} />}

          <select
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {genres &&
              genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                  style={{ padding: "10px" }}
                >
                  {genre.name}
                </option>
              ))}
          </select>

          <div className="header link">
            <p className="smallHeader">Author</p>
            <div className="addNewAuthor" onClick={ToggleNewAuthor}>
              Add New Author
            </div>
          </div>

          {NewAuthor && <AddAuthor style={{ marginBottom: "20px" }} />}
          <div
            className="author-selection"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {authors &&
              authors.map((author) => (
                <div key={author.id} className="author-option">
                  <label className="radio" htmlFor={`author-${author.id}`}>
                    <input
                      type="radio"
                      id={`author-${author.id}`}
                      name="author"
                      value={author.id}
                    />
                    <span>{author.name}</span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="flex mt-10 gap-5">
          <button className="btn add">Add Author</button>
          <button className="btn cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
export const addBookLoader = async () => {
  const [authorsResponse, genresResponse] = await Promise.all([
    fetch("http://localhost:5159/api/authors"),
    fetch("http://localhost:5159/api/genres"),
  ]);
  console.log(authorsResponse);
  console.log(genresResponse);

  if (!authorsResponse.ok || !genresResponse.ok) {
    throw Error("Could not fetch required data");
  }

  const authors = await authorsResponse.json();
  const genres = await genresResponse.json();

  return { authors, genres };
};
