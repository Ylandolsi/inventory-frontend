import { z } from "zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./EditGenre.scss";
import { GenreContext } from "@/components/Contexts/GenreContext";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthorContext } from "@/components/Contexts/AuthorContext";
import { BookContext } from "@/components/Contexts/BookContext";

export function EditGenre({ style }) {
  const { editGenre } = useContext(GenreContext);
  const navigate = useNavigate();

  const { refreshAuthors } = useContext(AuthorContext);
  const { refreshBooks } = useContext(BookContext);

  const formSchema = z.object({
    Id: z.coerce.number().int().min(1, { message: "Id must be at least 1" }),
    Name: z
      .string()
      .min(3, { message: "Genre name must be at least 3 characters" }),
    Description: z
      .string()
      .trim()
      .transform((val) => (val === "" ? "No description available" : val))
      .default("No description available"),
  });

  const { genreData } = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Id: genreData.id,
      Name: genreData.name,
      Description: genreData.description,
    },
  });

  const buttonClicked = () => {
    navigate("/genres");
  };

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    editGenre(data, refreshAuthors, refreshBooks);
    buttonClicked();
  };
  return (
    <div className="genreaddform" style={style}>
      <div className="flex flex-col px-6">
        <p className="AddNewTitle"> Add New Genre</p>
        <div>
          <div className="boxform gap-2 ">
            <div className="flex flex-col gap-3">
              <label htmlFor="Name" className="text-lg font-[500]">
                Genre Name:
              </label>
              <input
                id="Name"
                name="Name"
                className="p-2 w-full md:w-2/3 lg:w-1/2 "
                {...register("Name")}
              />
              {errors.Name && (
                <p className="error" style={{ color: "var(--accent)" }}>
                  {errors.Name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="Description" className="text-lg font-[500]">
                Description:
              </label>
              <textarea
                id="Description"
                name="Description"
                className="p-2 w-full  h-40"
                {...register("Description")}
              />
            </div>
          </div>
          <div className="flex mt-10 gap-5">
            <button
              type="button"
              className="btn add"
              onClick={handleSubmit(onSubmit)}
            >
              Update Genre
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={buttonClicked}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const EditGenreLoader = async ({ params }) => {
  const { id } = params;
  const [genreDataId] = await Promise.all([
    fetch(`http://localhost:5159/api/genres/${id}`),
  ]);

  if (!genreDataId.ok) {
    throw Error("Could not fetch required data");
  }

  const genreData = await genreDataId.json();

  return { genreData };
};
