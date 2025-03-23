import { z } from "zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddAuthor.scss";
import { AuthorContext } from "@/components/Contexts/AuthorContext";
import { useNavigate } from "react-router-dom";

export function AddAuthor({ style, onAuthorClicked }) {
  const { addAuthor } = useContext(AuthorContext);

  const navigate = useNavigate();
  const formSchema = z.object({
    Name: z
      .string()
      .min(3, { message: "Author name must be at least 3 characters" }),
    Bio: z.string().optional().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const isStandalone = location.pathname === "/authors/add";

  const buttonClicked = () => {
    if (isStandalone) navigate("/authors");
    else {
      if (onAuthorClicked) {
        onAuthorClicked();
      } else {
        reset();
      }
    }
  };

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    addAuthor(data);
    buttonClicked();
  };

  return (
    <div className="auth" style={style}>
      <div className="flex flex-col px-6">
        <p className="AddNewTitle"> Add New Author</p>
        <div>
          <div className="boxform gap-2">
            <div className="flex flex-col gap-3">
              <label htmlFor="Name" className="text-lg font-[500]">
                Author Name:
              </label>
              <input
                id="Name"
                name="Name"
                className="p-2 w-full md:w-2/3 lg:w-1/2"
                {...register("Name")}
              />
              {errors.Name && (
                <p className="error" style={{ color: "var(--accent)" }}>
                  {errors.Name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="Bio" className="text-lg font-[500]">
                Author Bio:
              </label>
              <textarea
                id="Bio"
                name="Bio"
                className="p-2 w-full h-40"
                {...register("Bio")}
              />
            </div>
          </div>
          <div className="flex mt-10 gap-5">
            <button
              type="button"
              className="btn add"
              onClick={handleSubmit(onSubmit)}
            >
              Add Author
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
