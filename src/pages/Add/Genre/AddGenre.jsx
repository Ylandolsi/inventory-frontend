import "./AddGenre.scss";
export function AddGenre({ style }) {
  return (
    <div className="genreaddform" style={style}>
      <div className="flex flex-col px-6">
        <p className="AddNewTitle"> Add New Genre</p>
        <div className="boxform gap-2 ">
          <div className="flex flex-col gap-3">
            <label htmlFor="authorName" className="text-lg font-[500]">
              Genre Name:
            </label>
            <input
              id="authorName"
              name="authorName"
              className="p-2 w-full md:w-2/3 lg:w-1/2 "
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="authorBio" className="text-lg font-[500]">
              Description:
            </label>
            <textarea
              id="authorBio"
              name="authorBio"
              className="p-2 w-full  h-40"
            />
          </div>
        </div>
        <div className="flex mt-10 gap-5">
          <button className="btn add">Add Genre</button>
          <button className="btn cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
