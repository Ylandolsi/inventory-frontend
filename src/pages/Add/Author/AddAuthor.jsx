import "./AddAuthors.scss";
export function AddAuthor() {
  return (
    <>
      <div className="flex flex-col px-6">
        <p className="AddNewTitle"> Add New Author</p>
        <div className="boxform gap-2 ">
          <div className="flex flex-col gap-3">
            <label htmlFor="authorName" className="text-lg font-[500]">
              Author Name:
            </label>
            <input
              id="authorName"
              name="authorName"
              className="p-2 w-full md:w-2/3 lg:w-1/2 "
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="authorBio" className="text-lg font-[500]">
              Author Bio:
            </label>
            <textarea
              id="authorBio"
              name="authorBio"
              className="p-2 w-full  h-40"
            />
          </div>
        </div>
        <div className="flex mt-10 gap-5">
          <button className="btn add">Add Author</button>
          <button className="btn cancel">Cancel</button>
        </div>
      </div>
    </>
  );
}
