import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./EditGenre.scss";
export function EditGenre({ style }) {
  const formSchema = z.object({
    genreName: z
      .string()
      .min(3, { message: "Genre name must be at least 3 characters" }),
    genreDescription: z.string().optional().nullable(),
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
  return (
    <div className="genreaddform" style={style}>
      <div className="flex flex-col px-6">
        <p className="EditNewTitle"> Edit New Genre</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="boxform gap-2 ">
            <div className="flex flex-col gap-3">
              <label htmlFor="genreName" className="text-lg font-[500]">
                Genre Name:
              </label>
              <input
                id="genreName"
                name="genreName"
                className="p-2 w-full md:w-2/3 lg:w-1/2 "
                {...register("genreName")}
              />
              {errors.genreName && (
                <p className="error" style={{ color: "var(--accent)" }}>
                  {errors.genreName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="genreDescription" className="text-lg font-[500]">
                Description:
              </label>
              <textarea
                id="genreDescription"
                name="genreDescription"
                className="p-2 w-full  h-40"
                {...register("genreDescription")}
              />
            </div>
          </div>
          <div className="flex mt-10 gap-5">
            <button type="submit" className="btn add">
              Edit Genre
            </button>
            <button type="button" className="btn cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
