import chroma from "chroma-js";
import { Plus } from "lucide-react";
import "../styles/App.scss";

export function Home() {
  const accentColor = chroma.oklch(0.269, 0, 0).rgb();
  const rgbValue = accentColor.join(", ");
  return (
    <div className="flex flex-col gap-5 items-center m-5 p-10 border rounded-lg">
      <h1 className="font-bold">Welcome to the Bookstore Inventory</h1>
      <p
        style={{
          fontWeight: 200,
          opacity: 0.8,
        }}
      >
        This is a simple app to manage your bookstore inventory.
      </p>
      <div className="mt-5 w-full flex flex-row justify-center items-center gap-10 flex-wrap">
        <div
          style={{ backgroundColor: `rgba(${rgbValue},0.2)` }}
          className="flex grow flex-col gap-2 p-5 rounded-lg h-40 justify-center"
        >
          <p className="text-2xl font-bold ">Books</p>
          <div className="text-3xl font-bold">1</div>
          <div className="font-thin">Total in inventory</div>
        </div>
        <div
          style={{ backgroundColor: `rgba(${rgbValue},0.2)` }}
          className="flex grow flex-col gap-2 p-5 rounded-lg h-40 justify-center"
        >
          <p className="text-2xl font-bold">Books</p>
          <div className="text-3xl font-bold">1</div>
          <div className="font-thin">Total in inventory</div>
        </div>
        <div
          style={{ backgroundColor: `rgba(${rgbValue},0.2)` }}
          className="flex grow flex-col gap-2 p-5 rounded-lg h-40 justify-center"
        >
          <p className="text-2xl font-bold">Books</p>
          <div className="text-3xl font-bold">1</div>
          <div className="font-thin">Total in inventory</div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full mt-3">
        <p className="font-bold text-2xl mr-auto overflow-auto">
          {" "}
          Quick Actions{" "}
        </p>
        <div className="flex flex-row gap-4 flex-wrap">
          <a
            href="/books/add"
            style={{ backgroundColor: `rgba(${rgbValue},0.2)` }}
            className="flex grow   gap-8 p-5 rounded-lg h-20 items-center"
          >
            <Plus></Plus>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold"> Add New Book</div>
              <div className="text-sm"> Add a new book to inventory</div>
            </div>
          </a>
          <a
            href="/books/add"
            style={{ backgroundColor: `rgba(${rgbValue},0.2)` }}
            className="flex grow  gap-8 p-5 rounded-lg h-20 items-center"
          >
            <Plus></Plus>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold"> Add New Author</div>
              <div className="text-sm"> Add a new author profile </div>
            </div>
          </a>
          <a
            href="/books/add"
            style={{ backgroundColor: `rgba(${rgbValue},0.2)` }}
            className="flex grow  gap-8 p-5 rounded-lg h-20 items-center"
          >
            <Plus></Plus>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold"> Add New Genre</div>
              <div className="text-sm"> Create a new book genre</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
