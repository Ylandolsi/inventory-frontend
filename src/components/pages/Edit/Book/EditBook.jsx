import { useContext, useState } from "react";
import "./EditBook.scss";
import { AddAuthor } from "../../Add/Author/AddAuthor";
import { AddGenre } from "../../Add/Genre/AddGenre";

import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenreContext } from "@/components/Contexts/GenreContext";
import { AuthorContext } from "@/components/Contexts/AuthorContext";
import { useLoaderData, useNavigate } from "react-router-dom";
import { BookContext } from "@/components/Contexts/BookContext";

const API_BASE_URL = import.meta.env.PROD
  ? 'https://inventory-api-la8y.onrender.com/api'
  : 'http://localhost:5159/api';

export function EditBook() {
  const { genres, refreshGenres } = useContext(GenreContext);
  const { authors, refreshAuthors } = useContext(AuthorContext);

  const { editBook } = useContext(BookContext);

  const { bookData } = useLoaderData();

  const navigate = useNavigate();

  const formSchema = z.object({
    id: z.number().int(),
    title: z
      .string()
      .min(3, { message: "BookTitle must be at least 3 characters" }),
    description: z
      .string()
      .trim()
      .transform((val) => (val === "" ? "No description available" : val))
      .default("No description available"),
    quantity: z.coerce
      .number()
      .int()
      .min(1, { message: "Quantity must be at least 1" }),
    genreid: z.coerce
      .number()
      .int()
      .min(1, { message: "Please select a genre" }),
    authorid: z.coerce.number().int().min(1, {
      message: "Please select an author",
    }),
  });

  if (!bookData) {
    return <div>Loading...</div>;
  }

  console.log(bookData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: bookData.id,
      title: bookData.title,
      description: bookData.description,
      quantity: bookData.quantity,
      authorid: bookData.authorId,
      genreid: bookData.genreId,
    },
  });

  const onSubmit = async (data) => {
    await editBook(data, refreshAuthors, refreshGenres);
    navigate("/books");
  };

  const [NewGenre, setNewGenre] = useState(false);
  const [NewAuthor, setNewAuthor] = useState(false);

  const ToggleNewGenre = () => {
    setNewGenre(!NewGenre);
  };
  const ToggleNewAuthor = () => {
    setNewAuthor(!NewAuthor);
  };

  return (
    <div className="bookaddform">
      <div className="flex flex-col px-6">
        <p className="AddNewTitle"> Edit Book</p>
        <div >
          <div className="boxform gap-2 ">
            <p className="smallHeader">Book Details </p>
            <div className="flex flex-col gap-3">
              <label htmlFor="title" className="text-lg font-[500]">
                Book Title:
              </label>
              <input
                id="title"
                name="title"
                className="p-2 w-full md:w-2/3 lg:w-1/2 "
                {...register("title")}
              />
              {errors.title && (
                <p className="error" style={{ color: "var(--accent)" }}>
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="description" className="text-lg font-[500]">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="p-2 w-full  h-40"
                {...register("description")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="quantity" className="text-lg font-[500]">
                Quantity:
              </label>
              <input
                id="quantity"
                name="quantity"
                className="p-2"
                {...register("quantity")}
              />
              {errors.quantity && (
                <p className="error" style={{ color: "var(--accent)" }}>
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="header link">
              <p className="smallHeader">Genre</p>
              <div className="addNewGenre" onClick={ToggleNewGenre}>
                Add New Genre
              </div>
            </div>

            {NewGenre && (
              <AddGenre
                style={{ marginBottom: "20px" }}
                onGenreClicked={() => {
                  setNewGenre(false);
                }}
              />
            )}

            <select
              id="genreid"
              name="genreid"
              {...register("genreid")}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              {genres && (
                <>
                  <option value="">-- Select a genre --</option>
                  {genres.map((genre) => (
                    <option
                      key={genre.id}
                      value={genre.id}
                      style={{
                        padding: "10px",
                        background: "var(--bg)",
                        color: "var(--text)",
                      }}
                    >
                      {genre.name}
                    </option>
                  ))}
                </>
              )}
            </select>
            {errors.genreid && (
              <p className="error" style={{ color: "var(--accent)" }}>
                {errors.genreid.message}
              </p>
            )}

            <div className="header link">
              <p className="smallHeader">Author</p>
              <div className="addNewAuthor" onClick={ToggleNewAuthor}>
                Add New Author
              </div>
            </div>

            {NewAuthor && (
              <AddAuthor
                style={{ marginBottom: "20px" }}
                onAuthorClicked={() => {
                  setNewAuthor(false);
                }}
              />
            )}
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
                    <label className="radio" htmlFor={author.id}>
                      <input
                        key={author.id}
                        type="radio"
                        id={author.id}
                        name="authorid"
                        value={author.id}
                        defaultChecked={author.id === bookData.authorId}
                        {...register("authorid")}
                      />
                      <span>{author.name}</span>
                    </label>
                  </div>
                ))}
            </div>
            {errors.authorid && (
              <p className="error" style={{ color: "var(--accent)" }}>
                {errors.authorid.message}
              </p>
            )}
          </div>
          <div className="flex mt-10 gap-5">
            <button className="btn add" type="button" onClick={handleSubmit(onSubmit)}>Update Book</button>
            <button
              type="button"
              className="btn cancel"
              onClick={() => navigate("/books")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const EditBookLoader = async ({ params }) => {
  const { id } = params;
  const [bookIdData] = await Promise.all([
    fetch(`${API_BASE_URL}/books/${id}`),
  ]);

  if (!bookIdData.ok) {
    throw Error("Could not fetch required data");
  }

  const bookData = await bookIdData.json();

  return { bookData };
};
