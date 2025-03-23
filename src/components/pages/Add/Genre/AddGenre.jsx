import { z } from "zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddGenre.scss";
import { GenreContext } from "@/components/Contexts/GenreContext";
import { useNavigate } from "react-router-dom";
export function AddGenre({ style, onGenreClicked }) {
  const { addGenre } = useContext(GenreContext);
  const navigate = useNavigate();

  const formSchema = z.object({
    Name: z
      .string()
      .min(3, { message: "Genre name must be at least 3 characters" }),
    Description: z.string().optional().nullable(),
  });

  const isStandalone = location.pathname === "/genres/add";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const buttonClicked = () => {
    if (isStandalone) navigate("/genres");
    else {
      if (onGenreClicked) {
        onGenreClicked();
      } else {
        reset();
      }
    }
  };

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    addGenre(data);
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
              Add Genre
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
