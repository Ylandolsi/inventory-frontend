import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./EditAuthor.scss";

export function EditAuthor({ style }) {
  const formSchema = z.object({
    authorName: z
      .string()
      .min(3, { message: "Author name must be at least 3 characters" }),
    authorBio: z.string().optional().nullable(),
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
    <div className="autheditform" style={style}>
      <div className="flex flex-col px-6">
        <p className="EditNewTitle"> Edit Author</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="boxform gap-2">
            <div className="flex flex-col gap-3">
              <label htmlFor="authorName" className="text-lg font-[500]">
                Author Name:
              </label>
              <input
                id="authorName"
                name="authorName"
                className="p-2 w-full md:w-2/3 lg:w-1/2"
                {...register("authorName")}
              />
              {errors.authorName && (
                <p className="error" style={{ color: "var(--accent)" }}>
                  {errors.authorName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="authorBio" className="text-lg font-[500]">
                Author Bio:
              </label>
              <textarea
                id="authorBio"
                name="authorBio"
                className="p-2 w-full h-40"
                {...register("authorBio")}
              />
            </div>
          </div>
          <div className="flex mt-10 gap-5">
            <button type="submit" className="btn add">
              Edit Author
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
