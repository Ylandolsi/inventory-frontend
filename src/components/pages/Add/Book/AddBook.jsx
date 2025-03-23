import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./AddBook.scss";
import { AddAuthor } from "../Author/AddAuthor";
import { AddGenre } from "../Genre/AddGenre";

import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function AddBook() {
  const { authors, genres } = useLoaderData();

  const formSchema = z.object({
    bookTitle: z
      .string()
      .min(3, { message: "BookTitle must be at least 3 characters" }),
    genreDescription: z.string().optional().nullable(),
    bookQuantity: z.coerce
      .number()
      .int()
      .min(1, { message: "Quantity must be at least 1" }),
    genreName: z.string().min(1, { message: "Please select a genre" }),
    authorName: z.string({
      message: "Please select an author",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    fetch("http://localhost:5159/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("Error:", error));
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="boxform gap-2 ">
            <p className="smallHeader">Book Details </p>
            <div className="flex flex-col gap-3">
              <label htmlFor="bookTitle" className="text-lg font-[500]">
                Book Title:
              </label>
              <input
                id="bookTitle"
                name="bookTitle"
                className="p-2 w-full md:w-2/3 lg:w-1/2 "
                {...register("bookTitle")}
              />
              {errors.bookTitle && (
                <p className="error" style={{ color: "var(--accent)" }}>
                  {errors.bookTitle.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="bookDescription" className="text-lg font-[500]">
                Description:
              </label>
              <textarea
                id="bookDescription"
                name="bookDescription"
                className="p-2 w-full  h-40"
                {...register("bookDescription")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="bookQuantity" className="text-lg font-[500]">
                Quantity:
              </label>
              <input
                id="bookQuantity"
                name="bookQuantity"
                className="p-2"
                {...register("bookQuantity")}
              />
              {errors.bookQuantity && (
                <p className="error" style={{ color: "var(--accent)" }}>
                  {errors.bookQuantity.message}
                </p>
              )}
            </div>

            <div className="header link">
              <p className="smallHeader">Genre</p>
              <div className="addNewGenre" onClick={ToggleNewGenre}>
                Add New Genre
              </div>
            </div>

            {NewGenre && <AddGenre style={{ marginBottom: "20px" }} />}

            <select
              id="genreName"
              name="genreName"
              {...register("genreName")}
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
                      value={genre.name}
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
            {errors.genreName && (
              <p className="error" style={{ color: "var(--accent)" }}>
                {errors.genreName.message}
              </p>
            )}

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
                    <label className="radio" htmlFor={author.id}>
                      <input
                        type="radio"
                        id={`author-${author.id}`}
                        name="author"
                        value={author.name}
                        {...register("authorName")}
                      />
                      <span>{author.name}</span>
                    </label>
                  </div>
                ))}
            </div>
            {errors.authorName && (
              <p className="error" style={{ color: "var(--accent)" }}>
                {errors.authorName.message}
              </p>
            )}
          </div>
          <div className="flex mt-10 gap-5">
            <button className="btn add">Add Book</button>
            <button className="btn cancel">Cancel</button>
          </div>
        </form>
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
