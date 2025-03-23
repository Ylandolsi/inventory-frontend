import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import "./EditBook.scss";
import { EditAuthor } from "../Author/EditAuthor";
import { EditGenre } from "../Genre/EditGenre";

import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function EditBook() {
  const { id } = useParams();
  const { authors, genres, bookData } = useLoaderData();

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
        <p className="AddNewTitle"> Edit Book</p>
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
                defaultValue={bookData.title}
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
                defaultValue={bookData.description}
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
                defaultValue={bookData.quantity}
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

            {NewGenre && <EditGenre style={{ marginBottom: "20px" }} />}

            <select
              id="genreName"
              name="genreName"
              {...register("genreName")}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              defaultValue={bookData.idGenre}
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

            {NewAuthor && <EditAuthor style={{ marginBottom: "20px" }} />}
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
                        id={author.id}
                        name="author"
                        value={author.id}
                        defaultChecked={author.id === bookData.idAuthor}
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
            <button className="btn add">Edit Book</button>
            <button className="btn cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export const EditBookLoader = async ({ params }) => {
  const { id } = params;
  const [authorsResponse, genresResponse, bookIdData] = await Promise.all([
    fetch("http://localhost:5159/api/authors"),
    fetch("http://localhost:5159/api/genres"),
    fetch(`http://localhost:5159/api/books/${id}`),
  ]);
  console.log(authorsResponse);
  console.log(genresResponse);
  console.log(bookIdData);

  if (!authorsResponse.ok || !genresResponse.ok || !bookIdData.ok) {
    throw Error("Could not fetch required data");
  }

  const authors = await authorsResponse.json();
  const genres = await genresResponse.json();
  const bookData = await bookIdData.json();

  return { authors, genres, bookData };
};
